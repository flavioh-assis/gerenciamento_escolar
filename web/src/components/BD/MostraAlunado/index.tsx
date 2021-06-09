import React, { useEffect, useState } from 'react'
import { ColDef, DataGrid, GridApi, CellValue } from '@material-ui/data-grid'
import { Button } from '@material-ui/core'

import api from '../../../services/api'
import GoToIcon from '../../../assets/images/icons/go_to_icon.png'

import './styles.css'

const columns: ColDef[] = [
  {
    field: 'num_chamada',
    headerName: 'Nº',
    width: 52,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'nome',
    headerName: 'Nome Completo',
    width: 290,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'ra',
    headerName: 'RA',
    width: 133,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'id',
    headerName: 'RM',
    width: 60,
    align: 'center',
    headerAlign: 'center',
    hide: true,
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
  {
    field: 'dados',
    headerName: 'Abrir',
    width: 87,
    align: 'center',
    headerAlign: 'center',
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

        // chamar o link passando o id
      }

      return (
        <Button className='go_to' onClick={onClick}>
          <img alt='Go To' className='go_to_icon' src={GoToIcon} />
        </Button>
      )
    },
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
