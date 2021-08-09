import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { DataGrid, ColDef } from '@material-ui/data-grid'

import api from '../../../services/api'

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
    headerName: 'Professor(a)',
    width: 320,
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
const onlyPortfolio = true
const MostraClassesCompleta = (props: any) => {
  function atualizaTabela() {
    api.get('classes').then((response) => {
      props.setClasses(response.data)
    })
    props.setUpdate(false)
  }

  useEffect(() => {
    if (!onlyPortfolio) {
      if (props.update) {
        atualizaTabela()
      }
    }
  })

  return (
    <div className='mostra-classes-completa'>
      <DataGrid
        rows={props.classes}
        columns={columns}
        pageSize={18}
        rowHeight={40}
        autoHeight
      />
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    classes: state.classe.classes,
    update: state.classe.update,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setClasses: (newClasses: any) =>
      dispatch({
        type: 'SET_CLASSES',
        payload: { classes: newClasses },
      }),
    setUpdate: (updated: any) =>
      dispatch({
        type: 'SET_UPDATE',
        payload: { update: updated },
      }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MostraClassesCompleta)
