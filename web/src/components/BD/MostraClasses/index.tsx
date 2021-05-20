import React, { useState, useEffect } from 'react'
import { ColDef, DataGrid, GridApi, CellValue } from '@material-ui/data-grid'
import { Button } from '@material-ui/core'

import ExcluirIcon from '../../../assets/images/trash_icon.png'
import api from '../../../services/api'

import './styles.css'

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
    headerName: 'Exc',
    align: 'center',
    field: 'excluir',
    headerAlign: 'center',
    width: 80,
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
          // var v = [f, params.getValue(f)]

          thisRow[f] = params.getValue(f)
        })

        let erro = `Não é possível excluir uma classe com aluno ativo.
Faça o REMANEJAMENTO de todos os alunos para um outra classe antes da exclusão.`

        if ((thisRow['n_ativos'] as number) > 0) {
          alert(erro)
        } else {
          // ;() => {
          //   api
          //     .delete('classes', {
          //       data: {
          //         id: thisRow['id'],
          //       },
          //     })
          //     .then(() => alert('Classe excluída com sucesso!'))
          //     .catch(() => alert('ERRO! Algo deu errado.'))
          // }
        }

        // return alert(JSON.stringify(thisRow, null, 1));
      }

      return (
        <Button className='excluir' onClick={onClick}>
          <img alt='Excluir' className='excluir_icon' src={ExcluirIcon} />
        </Button>
      )
    },
  },
]

export default () => {
  const [classes, setClasses] = useState([])

  useEffect(() => {
    api.get('classes').then((response) => {
      setClasses(response.data)
    })
  }, [classes])

  return (
    <div className='mostra-classes'>
      <DataGrid rows={classes} columns={columns} pageSize={9} autoHeight />
    </div>
  )
}
