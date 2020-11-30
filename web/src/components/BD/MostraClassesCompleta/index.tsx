import React, { useState, useEffect } from 'react'
import { DataGrid, ColDef } from '@material-ui/data-grid'
import api from '../../../services/api'

import './styles.css'

const columns: ColDef[] = [
  { field: 'id', headerName: 'ID', width: 70, hide: true },
  { field: 'ano', headerName: 'Ano', width: 80 },
  { field: 'turma', headerName: 'Turma', width: 80 },
  { field: 'periodo', headerName: 'Periodo', width: 80 },
  { field: 'sala', headerName: 'Sala', width: 70 },
  { field: 'professor', headerName: 'Professor', width: 200 },
  { field: 'ativos', headerName: 'Ativos', width: 80 },
  { field: 'total', headerName: 'Total', width: 80 },
  { field: 'situaçao', headerName: 'Situaçao', width: 80, hide: true },
  { field: 'ano_letivo', headerName: 'Ano Letivo', width: 80, hide: true }
]

export default () => {
  const [classes, setClasses] = useState([])

  useEffect(() => {
    api.get('/classes').then(response => {
      setClasses(response.data)
    })
  }, [classes])

  return (
    <div className="mostra-classes">
      <DataGrid rows={classes} columns={columns} pageSize={9} />
    </div>
  )
}
