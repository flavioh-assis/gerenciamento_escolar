import React, { useState, useEffect } from 'react'
import { ColDef, DataGrid } from '@material-ui/data-grid'

import api from '../../../services/api'

import './styles.css'

const columns: ColDef[] = [
  { field: 'rm', headerName: 'ID', width: 50, hide: true },
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
    width: 140,
  },
  {
    headerName: 'Sala',
    align: 'center',
    field: 'sala',
    headerAlign: 'center',
    width: 120,
  },
  {
    headerName: 'Professor',
    align: 'center',
    field: 'professor',
    headerAlign: 'center',
    width: 360,
  },
  {
    field: 'n_ativos',
    width: 30,
    hide: true,
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
