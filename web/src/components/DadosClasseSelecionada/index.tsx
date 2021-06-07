import React, { useEffect, useState, FormEvent } from 'react'
import { connect } from 'react-redux'
import { ColDef, DataGrid, GridApi, CellValue } from '@material-ui/data-grid'
import { Button, useScrollTrigger } from '@material-ui/core'

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

  const [disponiveis, setDisponiveis] = useState(Array)
  const [turmasDisp, setTurmasDisp] = useState(Array())
  const [salasDisp, setSalasDisp] = useState(Array())

  const [disabled, setDisabled] = useState({
    ano: true,
    turma: true,
    periodo: true,
    sala: true,
    professor: true,
  })

  const erro = `Não é possível excluir uma classe com aluno ativo.`

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

          atualizaTurmas2(newano, newturma)
          atualizaSalas2(newperiodo, newsala)

          if (![...props.disp].includes(newano)) {
            setDisponiveis([...props.disp, newano].sort())
          } else {
            setDisponiveis(props.disp)
          }

          setTurmasDisp([...turmasDisp, newturma].sort())
          setSalasDisp([...salasDisp, newsala].sort())

          setSelectDisabled(false)
        }

        return (
          <Button className='editar' onClick={onClick}>
            <img alt='Editar' className='editar_icon' src={EditarIcon} />
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

            if (ok) {
              excluiClasse(thisRow['id'] as Number)
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

  useEffect(() => {
    if (props.upDisp) {
      atualizaDisponiveis()
    }
  })

  function atualizaTabela() {
    api.get('classes').then((response) => {
      props.setClasses(response.data)
    })
  }

  function atualizaDisponiveis() {
    api.get('classes/disp').then((resp) => {
      props.setDisp(resp.data.disp)
      props.setSel(resp.data.sel)
    })
    props.setUpDisp(false)
  }

  function atualizaTurmas(ano: string) {
    api.get(`classes/disp?ano=${ano}`).then((resp) => {
      setTurmasDisp(resp.data)
    })
  }

  function atualizaTurmas2(ano: string, turma: string) {
    api.get(`classes/disp?ano=${ano}`).then((resp) => {
      setTurmasDisp([...resp.data, turma].sort())
    })
  }

  function atualizaSalas(periodo: string) {
    api.get(`classes/disp?periodo=${periodo}`).then((resp) => {
      setSalasDisp(resp.data)
    })
  }

  function atualizaSalas2(periodo: string, sala: string) {
    api.get(`classes/disp?periodo=${periodo}`).then((resp) => {
      setSalasDisp([...resp.data, sala].sort())
    })
  }

  function limparCampos() {
    setAno('')
    setTurma('')
    setPeriodo('')
    setSala('')
    setProfessor('')
  }

  function excluiClasse(id: Number) {
    api
      .delete('classes', {
        data: {
          id: id,
        },
      })
      .then(() => {
        atualizaTabela()
        alert(`A Classe foi excluída com sucesso!`)
      })
      .catch(() => alert('ERRO! Não foi possível excluir a Classe.'))
  }

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
      })
      .then(() => {
        alert('Dados alterados com sucesso!')
        atualizaTabela()
        props.setUpDisp(true)
        limparCampos()
        setSelectDisabled(true)
      })
      .catch((err) => alert(err.response.request._response))
  }

  function setSelectDisabled(dis: boolean) {
    setDisabled({
      ano: dis,
      turma: dis,
      periodo: dis,
      sala: dis,
      professor: dis,
    })
  }

  return (
    <>
      <div className='dados-classe-selecao'>
        <Select
          name='ano'
          label='Ano'
          value={ano}
          disabled={disabled.ano}
          onChange={(t) => {
            setAno(t.target.value)
            atualizaTurmas(t.target.value)
            setTurma('')
          }}
          options={disponiveis.map((x: any) => {
            return { value: x, label: x }
          })}
        />

        <Select
          name='turma'
          label='Turma'
          value={turma}
          disabled={disabled.turma}
          onChange={(t) => {
            setTurma(t.target.value)
          }}
          options={turmasDisp.map((x: any) => {
            return { value: x, label: x }
          })}
        />

        <Select
          name='periodo'
          label='Periodo'
          value={periodo}
          disabled={disabled.periodo}
          onChange={(t) => {
            setPeriodo(t.target.value)
            atualizaSalas(t.target.value)
            setSala('')
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
          disabled={disabled.sala}
          onChange={(t) => {
            setSala(t.target.value)
          }}
          options={salasDisp.map((x: any) => {
            return { value: x, label: x }
          })}
        />

        <Input
          label='Professor(a)'
          name='professor'
          id='professor'
          onChange={(t) => setProfessor(t.target.value)}
          value={professor}
          disabled={disabled.professor}
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
    disp: state.classe.disp,
    sel: state.classe.sel,
    upDisp: state.classe.upDisp,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setClasses: (NEW: []) =>
      dispatch({
        type: 'SET_CLASSES',
        payload: { classes: NEW },
      }),
    setDisp: (NEW: []) =>
      dispatch({
        type: 'SET_DISP',
        payload: { disp: NEW },
      }),
    setSel: (NEW: []) =>
      dispatch({
        type: 'SET_SEL',
        payload: { disp: NEW },
      }),
    setUpDisp: (NEW: boolean) =>
      dispatch({
        type: 'SET_UPDISP',
        payload: { disp: NEW },
      }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DadosClasseSelecionada)