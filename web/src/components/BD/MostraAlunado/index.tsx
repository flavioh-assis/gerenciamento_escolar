import React, { useEffect, useState } from 'react'
import { ColDef, DataGrid } from '@material-ui/data-grid'

import api from '../../../services/api'

import './styles.css'

const columns: ColDef[] = [
  {
    field: 'num_chamada',
    headerName: 'Nº',
    width: 60,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'nome',
    headerName: 'Nome',
    width: 300,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'ra',
    headerName: 'RA',
    width: 140,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'id',
    headerName: 'RM',
    width: 60,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'nasc_data',
    headerName: 'Data Nasc',
    width: 120,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'situacao',
    headerName: 'Situação',
    width: 130,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'nee',
    headerName: 'Deficiência',
    width: 140,
    align: 'center',
    headerAlign: 'center',
  },
]

interface AlunosPros {
  filter: string
}

const MostraAlunosPesquisa: React.FC<AlunosPros> = ({ filter }) => {
  const query = `alunos${filter}`
  const [alunos, setAlunos] = useState([])

  useEffect(() => {
    api.get(query).then((response) => {
      setAlunos(response.data)
    })
  }, [])

  return (
    <div id='mostra-alunado'>
      <DataGrid
        rows={alunos}
        columns={columns}
        pageSize={20}
        rowHeight={30}
        autoHeight
      />
    </div>
  )
}

export default MostraAlunosPesquisa
