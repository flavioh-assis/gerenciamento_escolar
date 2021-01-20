import React, { useEffect, useState } from 'react'
import { ColDef, DataGrid } from '@material-ui/data-grid'

import api from '../../../services/api'

import './styles.css'

const columns: ColDef[] = [
  { field: 'id', headerName: 'ID', width: 70, hide: true },
  { field: 'nome', headerName: 'Nome Completo', width: 280 },
  { field: 'ano', headerName: 'Ano', width: 90 },
  { field: 'turma', headerName: 'Turma', width: 100 },
  { field: 'ra', headerName: 'RA', width: 70 },
  { field: 'rm', headerName: 'RM', width: 70 },
  { field: 'professor', headerName: 'Professor', width: 220 }
]

interface AlunosPros {
  filter: string
}

const MostraAlunosPesquisa: React.FC<AlunosPros> = ({ filter }) => {
  const [alunos, setAlunos] = useState([])

  useEffect(() => {
    api.get(`alunos${filter}`).then(response => {
      setAlunos(response.data)
    })
  }, [alunos])

  return (
    <div className="mostra-alunos-pesquisa">
      <DataGrid rows={alunos} columns={columns} pageSize={5} autoHeight />
    </div>
  )
}

export default MostraAlunosPesquisa
