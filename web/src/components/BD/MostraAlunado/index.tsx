import React, { useEffect, useState } from 'react'
import { ColDef, DataGrid } from '@material-ui/data-grid'

import api from '../../../services/api'

import './styles.css'

const columns: ColDef[] = [
  { field: 'id', headerName: 'ID', width: 70, hide: true },
  { field: 'num', headerName: 'Nº', width: 70} ,
  { field: 'nome', headerName: 'Nome Completo', width: 300 },
  { field: 'ra', headerName: 'RA', width: 135 },
  { field: 'rm', headerName: 'RM', width: 80 },
  { field: 'nee', headerName: 'Deficiência', width: 139 },
  { field: 'nasc_data', headerName: 'Nascimento', width: 132 }
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
