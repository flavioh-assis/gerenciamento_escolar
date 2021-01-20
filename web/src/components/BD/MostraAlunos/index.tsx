import React, { useEffect, useState } from 'react'
import { ColDef, DataGrid } from '@material-ui/data-grid'

import api from '../../../services/api'

import './styles.css'

const columns: ColDef[] = [
  { field: 'id', headerName: 'ID', width: 70, hide: true },
  { field: 'nome', headerName: 'Nome Completo', width: 200 },
  { field: 'ano', headerName: 'Ano', width: 90 },
  { field: 'turma', headerName: 'Turma', width: 90 },
  { field: 'ra', headerName: 'RA', width: 90 },
  { field: 'rm', headerName: 'RM', width: 90 },
  { field: 'professor', headerName: 'Professor', width: 200 }
]

export default () => {
  const [alunos, setAlunos] = useState([])

  useEffect(() => {
    api.get('alunos').then(response => {
      setAlunos(response.data)
    })
  }, [alunos])

  return (
    <div className="mostra-alunos">
      <DataGrid rows={alunos} columns={columns} pageSize={9} />
    </div>
  )
}
