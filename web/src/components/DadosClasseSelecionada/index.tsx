import React, { useEffect, useState, FormEvent } from 'react'
import { connect } from 'react-redux'
import { ColDef, DataGrid, GridApi, CellValue } from '@material-ui/data-grid'
import { Button } from '@material-ui/core'

import api from '../../services/api'
import EditarIcon from '../../assets/images/edit_icon.png'
import ExcluirIcon from '../../assets/images/trash_icon.png'
import Input from '../Input'
import Select from '../Select'

import './styles.css'

const DadosClasseSelecionada = (props: any) => {
  const [id, setId] = useState(0)
  const [ano, setAno] = useState('')
  const [turma, setTurma] = useState('')
  const [periodo, setPeriodo] = useState('')
  const [sala, setSala] = useState('')
  const [professor, setProfessor] = useState('')

  const erro = `Não é possível excluir uma classe com aluno ativo.
  Faça o REMANEJAMENTO de todos os alunos para um outra classe antes da exclusão.`

  const columns: ColDef[] = [
    { field: 'id', headerName: 'ID', width: 50, hide: true },
    {
      headerName: 'Ano',
      align: 'center',
      field: 'ano',
      headerAlign: 'center',
      sortDirection: 'asc',
      width: 110,
    },
    {
      headerName: 'Turma',
      align: 'center',
      field: 'turma',
      headerAlign: 'center',
      sortDirection: 'asc',
      width: 130,
    },
    {
      headerName: 'Período',
      align: 'center',
      field: 'periodo',
      headerAlign: 'center',
      width: 130,
    },
    {
      headerName: 'Sala',
      align: 'center',
      field: 'sala',
      headerAlign: 'center',
      width: 110,
    },
    {
      headerName: 'Professor',
      align: 'center',
      field: 'professor',
      headerAlign: 'center',
      width: 300,
    },
    {
      field: 'n_ativos',
      width: 30,
      hide: true,
    },
    {
      headerName: 'Editar',
      align: 'center',
      field: 'editar',
      headerAlign: 'center',
      width: 87,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          const gApi: GridApi = params.api
          const fields = gApi
            .getAllColumns()
            .map((c) => c.field)
            .filter((c) => c !== '__check__' && !!c)
          const thisRow: Record<string, CellValue> = {}

          fields.forEach((f) => {
            thisRow[f] = params.getValue(f)
          })

          const newid = thisRow['id'] as number
          const newano = thisRow['ano'] as string
          const newturma = thisRow['turma'] as string
          const newperiodo = thisRow['periodo'] as string
          const newsala = thisRow['sala'] as string
          const newprofessor = thisRow['professor'] as string

          setId(newid)
          setAno(newano)
          setTurma(newturma)
          setPeriodo(newperiodo)
          setSala(newsala)
          setProfessor(newprofessor)

          // if ((thisRow['n_ativos'] as number) > 0) {
          //   alert(erro)
          // } else {
          //   const newid = thisRow['id']
          //   const newano = thisRow['ano']
          //   const newturma = thisRow['turma']
          //   const newperiodo = thisRow['periodo']
          //   const newsala = thisRow['sala']
          //   const newprofessor = thisRow['professor']

          //   api
          //     .put('classes', {
          //       id: newid,
          //       ano: newano,
          //       turma: newturma,
          //       periodo: newperiodo,
          //       sala: newsala,
          //       professor: newprofessor,
          //     })
          //     .then(() => {
          //       alert('Dados alterados com sucesso!')
          //       atualizaClasses()
          //     })
          //     .catch(() => alert('ERRO! Algo deu errado.'))
          // }
        }

        return (
          <Button className='editar' onClick={onClick}>
            <img alt='Eeditar' className='editar_icon' src={EditarIcon} />
          </Button>
        )
      },
    },
    {
      headerName: 'Excluir',
      align: 'center',
      field: 'excluir',
      headerAlign: 'center',
      width: 87,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          const gApi: GridApi = params.api
          const fields = gApi
            .getAllColumns()
            .map((c) => c.field)
            .filter((c) => c !== '__check__' && !!c)
          const thisRow: Record<string, CellValue> = {}

          fields.forEach((f) => {
            thisRow[f] = params.getValue(f)
          })

          if ((thisRow['n_ativos'] as number) > 0) {
            alert(erro)
          } else {
            const ok = window.confirm('Deseja excluir essa Classe?')
            const exSucesso = `A Classe ${thisRow['ano']} ${thisRow['turma']} foi excluída com sucesso!`

            if (ok) {
              api
                .delete('classes', {
                  data: {
                    id: thisRow['id'],
                  },
                })
                .then(() => {
                  // atualizaClasses()
                  alert(exSucesso)
                })
                .catch(() => alert('ERRO! Não foi possível excluir a Classe.'))
            }
          }
        }

        return (
          <Button className='excluir' onClick={onClick}>
            <img alt='Excluir' className='excluir_icon' src={ExcluirIcon} />
          </Button>
        )
      },
    },
  ]

  function handleSalvar(e: FormEvent) {
    e.preventDefault()

    api
      .put('classes', {
        id: id,
        ano: ano,
        turma: turma,
        periodo: periodo,
        sala: sala,
        professor: professor,
      }).then(() => {
        alert('Dados alterados com sucesso!')
        atualizaTabela()
      })
      .catch((err) => alert(err.response.request._response))
  }

  function atualizaTabela() {
    api.get('classes').then((response) => {
      props.setClasses(response.data)
    })
  }

  return (
    <>
      <div className='dados-classe-selecao'>
        <Select
          name='ano'
          label='Ano'
          value={ano}
          onChange={(t) => {
            setAno(t.target.value)
          }}
          options={
            // opAno
            [
              { value: '1º', label: '1º' },
              { value: '2º', label: '2º' },
              { value: '3º', label: '3º' },
              { value: '4º', label: '4º' },
              { value: '5º', label: '5º' },
            ]
          }
        />

        <Select
          name='turma'
          label='Turma'
          value={turma}
          onChange={(t) => {
            setTurma(t.target.value)
          }}
          options={[
            { value: 'A', label: 'A' },
            { value: 'B', label: 'B' },
            { value: 'C', label: 'C' },
            { value: 'D', label: 'D' },
          ]}
        />

        <Select
          name='periodo'
          label='Periodo'
          value={periodo}
          onChange={(t) => {
            setPeriodo(t.target.value)
          }}
          options={[
            { value: 'Manhã', label: 'Manhã' },
            { value: 'Tarde', label: 'Tarde' },
          ]}
        />

        <Select
          name='sala'
          label='Sala'
          value={sala}
          onChange={(t) => {
            setSala(t.target.value)
          }}
          options={[
            { value: '01', label: '01' },
            { value: '02', label: '02' },
            { value: '03', label: '03' },
            { value: '04', label: '04' },
            { value: '05', label: '05' },
            { value: '06', label: '06' },
            { value: '07', label: '07' },
            { value: '08', label: '08' },
            { value: '09', label: '09' },
          ]}
        />

        <Input
          label='Professor(a)'
          name='professor'
          id='professor'
          onChange={(t) => setProfessor(t.target.value)}
          value={professor}
        />
        <input
          type='button'
          className='botao'
          onClick={handleSalvar}
          value='Salvar'
        />
      </div>
      <div className='dados-mostra-classes-editar'>
        <DataGrid
          rows={props.classes}
          columns={columns}
          pageSize={9}
          autoHeight
        />
      </div>
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    classes: state.classe.classes,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setClasses: (newClasses: any) =>
      dispatch({
        type: 'SET_CLASSES',
        payload: { classes: newClasses },
      }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DadosClasseSelecionada)
