import React, { useState, useEffect } from 'react'
import { DataGrid, ColDef } from '@material-ui/data-grid'
import api from '../../../services/api'

import './styles.css'

const columns: ColDef[] = [
  { field: 'id', headerName: 'ID', width: 70, hide: true },
  {
    field: 'ano',
    headerName: 'Ano',
    width: 90,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'turma',
    headerName: 'Turma',
    width: 110,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'periodo',
    headerName: 'Periodo',
    width: 120,
    sortDirection: 'asc',
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'sala',
    headerName: 'Sala',
    width: 90,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'professor',
    headerName: 'Professor',
    width: 285,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'n_ativos',
    headerName: 'Ativos',
    width: 85,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'n_total',
    headerName: 'Total',
    width: 80,
    align: 'center',
    headerAlign: 'center'
  },
  { field: 'situaçao', headerName: 'Situaçao', width: 90, hide: true }
]

export default () => {
  const [classes, setClasses] = useState([])

  useEffect(() => {
    api.get('/classes').then(response => {
      setClasses(response.data)
    })
  }, [classes])

  return (
    <div className="mostra-classes-completa">
      <DataGrid
        rows={classes}
        columns={columns}
        pageSize={18}
        rowHeight={35}
        autoHeight
      />
    </div>
  )
}
