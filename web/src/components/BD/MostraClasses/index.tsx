import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ColDef, DataGrid } from '@material-ui/data-grid'

import api from '../../../services/api'

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
    field: 'n_ativos',
    width: 30,
    hide: true,
  },
]

const MostraClasse = (props: any) => {
  
  function atualizaTabela() {
    api.get('classes').then((response) => {
      props.setClasses(response.data)
    })
    props.setUpdate(false)
  }

  useEffect(() => {
    if (props.update) {
      atualizaTabela()
    }
  })

  return (
    <div className='mostra-classes'>
      <DataGrid
        rows={props.classes}
        columns={columns}
        pageSize={9}
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

export default connect(mapStateToProps, mapDispatchToProps)(MostraClasse)
