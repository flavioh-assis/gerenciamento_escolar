import React from 'react'
import { connect } from 'react-redux'
import { ColDef, DataGrid } from '@material-ui/data-grid'

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
    headerName: 'Ativos',
    align: 'center',
    field: 'n_ativos',
    headerAlign: 'center',
    width: 90,
  },
]

const MostraClasse = (props: any) => {
  
  return (
    <div className='mostra-classes'>
      <DataGrid
        rows={props.classes}
        columns={columns}
        pageSize={6}
        autoHeight
      />
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    classes: state.classe.classes,
  }
}

export default connect(mapStateToProps)(MostraClasse)