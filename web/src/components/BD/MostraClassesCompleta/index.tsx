import React from 'react'
import { connect } from 'react-redux'
import { DataGrid, ColDef } from '@material-ui/data-grid'

import './styles.css'

const columns: ColDef[] = [
  { field: 'id', headerName: 'ID', width: 70, hide: true },
  {
    field: 'ano',
    headerName: 'Ano',
    width: 100,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'turma',
    headerName: 'Turma',
    width: 120,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'periodo',
    headerName: 'Periodo',
    width: 130,
    sortDirection: 'asc',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'sala',
    headerName: 'Sala',
    width: 100,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'professor',
    headerName: 'Professor',
    width: 300,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'n_ativos',
    headerName: 'Ativos',
    width: 90,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'n_total',
    headerName: 'Total',
    width: 90,
    align: 'center',
    headerAlign: 'center',
  },
  { field: 'situaçao', headerName: 'Situaçao', width: 90, hide: true },
]

const MostraClassesCompleta = (props: any) => {
  return (
    <div className='mostra-classes-completa'>
      <DataGrid
        rows={props.classes}
        columns={columns}
        pageSize={18}
        // rowHeight={35}
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    setClasses: (newClasses: any) =>
      dispatch({
        type: 'SET_CLASSES',
        payload: { classes: newClasses },
      }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MostraClassesCompleta)
