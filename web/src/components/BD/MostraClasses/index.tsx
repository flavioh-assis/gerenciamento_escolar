import React, { useState, useEffect } from 'react'
import { DataGrid, ColDef } from '@material-ui/data-grid'
import api from '../../../services/api'

import './styles.css'

const columns: ColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 /*, hide: true */ },
  { field: 'ano', headerName: 'Ano', width: 90 },
  { field: 'turma', headerName: 'Turma', width: 90 },
  { field: 'periodo', headerName: 'Periodo', width: 90 },
  { field: 'sala', headerName: 'Sala', width: 90 },
  { field: 'professor', headerName: 'Professor', width: 170 }
]

export default () => {
  const [classes, setClasses] = useState([])

  useEffect(() => {
    api.get('classes').then(response => {
      setClasses(response.data)
    })
  }, [classes])

  return (
    <div className="mostra-classes">
      <DataGrid rows={classes} columns={columns} pageSize={9} />
    </div>
  )
}
