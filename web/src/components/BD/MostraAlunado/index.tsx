import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ColDef, DataGrid, GridApi, CellValue } from '@material-ui/data-grid'
import { Link } from 'react-router-dom'

import api from '../../../services/api'
import GoToIcon from '../../../assets/images/icons/go_to_icon.png'

import './styles.css'

const MostraAlunado = (props: any) => {
  const query = `alunos${props.filter}`
  // const [alunos, setAlunos] = useState([]) //usar em produção
  const [alunos, setAlunos] = useState([
    {
      id: 1,
      num_chamada: 1,
      nome: 'ANA BEATRIZ CALIXTO ALVES DIAS',
      ra: '116.004.428-4',
      nasc_data: '01/10/2014',
      situacao: 'ATIVO',
      nee: 'Autismo',
      dados: '',
    },
    {
      id: 2,
      num_chamada: 2,
      nome: 'BEATRIZ BITENCOURT DE ALMEIDA',
      ra: '114.919.539-3',
      nasc_data: '11/07/2014',
      situacao: 'ATIVO',
      nee: '',
      dados: '',
    },
    {
      id: 3,
      num_chamada: 3,
      nome: 'CATARINA GASPARINI DA ROCHA',
      ra: '120.937.636-2',
      nasc_data: '28/06/2014',
      situacao: 'ATIVO',
      nee: '',
      dados: '',
    },
    {
      id: 4,
      num_chamada: 4,
      nome: 'DAVI FERREIRA CRISPIM',
      ra: '121.083.879-5',
      nasc_data: '121.083.879',
      situacao: 'ATIVO',
      nee: '',
      dados: '',
    },
    {
      id: 5,
      num_chamada: 5,
      nome: 'EDSON LEANDRO DA SILVA COSTA',
      ra: '121.084.044-3',
      nasc_data: '02/05/2014',
      situacao: 'ATIVO',
      nee: '',
      dados: '',
    },
    {
      id: 6,
      num_chamada: 6,
      nome: 'ISSAC VIEIRA LIMA',
      ra: '115.904.405-3',
      nasc_data: '30/01/2015',
      situacao: 'ATIVO',
      nee: '',
      dados: '',
    },
    {
      id: 7,
      num_chamada: 7,
      nome: 'JOAO VICTOR BENEDICTO DE SOUSA',
      ra: '116.003.708-5',
      nasc_data: '04/10/2014',
      situacao: 'ATIVO',
      nee: 'Cadeirante',
      dados: '',
    },
    {
      id: 8,
      num_chamada: 8,
      nome: 'JOÃO RAPHAEL TEODORO DE AVELAR',
      ra: '115.024.815-4',
      nasc_data: ' 05/11/2014',
      situacao: 'ATIVO',
      nee: '',
      dados: '',
    },
    {
      id: 9,
      num_chamada: 9,
      nome: 'KETLLYN DO NASCIMENTO OLIVEIRA',
      ra: '114.241.524-7',
      nasc_data: '09/04/2014',
      situacao: 'ATIVO',
      nee: '',
      dados: '',
    },
    {
      id: 10,
      num_chamada: 10,
      nome: 'LAURA FAETANO CORREIA',
      ra: '121.085.610-4',
      nasc_data: '17/09/2014',
      situacao: 'ATIVO',
      nee: '',
      dados: '',
    },
    {
      id: 11,
      num_chamada: 11,
      nome: 'LAVINYA DA SILVA ZUANON',
      ra: '120.929.684-6',
      nasc_data: '23/12/2014',
      situacao: 'ATIVO',
      nee: '',
      dados: '',
    },
    {
      id: 12,
      num_chamada: 12,
      nome: 'LIVIA CALIGIONI RIBEIRO',
      ra: '116.760.187-7',
      nasc_data: '05/01/2015',
      situacao: 'ATIVO',
      nee: '',
      dados: '',
    },
    {
      id: 13,
      num_chamada: 13,
      nome: 'LORRAINER BASSO GONÇALVES',
      ra: '05/01/2015-0',
      nasc_data: ' 28/04/2014',
      situacao: 'ATIVO',
      nee: 'Intelectual',
      dados: '',
    },
    {
      id: 14,
      num_chamada: 14,
      nome: 'LUIZA BOLDRIN DINIZ',
      ra: '120.926.468-7',
      nasc_data: '23/06/2014',
      situacao: 'ATIVO',
      nee: '',
      dados: '',
    },
    {
      id: 15,
      num_chamada: 15,
      nome: 'MATHEUS BERNARDES SERTÓRIO',
      ra: '120.090.386-9',
      nasc_data: '02/08/2014',
      situacao: 'ATIVO',
      nee: '',
      dados: '',
    },
    {
      id: 16,
      num_chamada: 16,
      nome: 'MELISSA BITELLA CABRAL',
      ra: '120.919.256-1',
      nasc_data: '20/02/2014',
      situacao: 'ATIVO',
      nee: '',
      dados: '',
    },
    {
      id: 17,
      num_chamada: 17,
      nome: 'NICOLE BRUNASI DE SOUSA',
      ra: '120.948.688-X',
      nasc_data: '22/01/2015',
      situacao: 'ATIVO',
      nee: '',
      dados: '',
    },
    {
      id: 18,
      num_chamada: 18,
      nome: 'NICOLLY ASHILEY SILVA BUENO',
      ra: '115.225.993-3',
      nasc_data: '115.225.993',
      situacao: 'ATIVO',
      nee: '',
      dados: '',
    },
    {
      id: 19,
      num_chamada: 19,
      nome: 'OTAVIO HENRIQUE JUSSIANI DE OLIVEIRA',
      ra: '116.704.300-5',
      nasc_data: '06/02/2015',
      situacao: 'ATIVO',
      nee: 'Múltipla',
      dados: '',
    },
    {
      id: 20,
      num_chamada: 20,
      nome: 'PEDRO OTÁVIO CARDOZO CUSTÓDIO',
      ra: '121.086.169-0',
      nasc_data: '02/05/2014',
      situacao: 'ATIVO',
      nee: '',
      dados: '',
    },
    {
      id: 21,
      num_chamada: 21,
      nome: 'RAQUEL TEIXEIRA TRINDADE',
      ra: '115.198.618-5',
      nasc_data: '30/01/2015',
      situacao: 'ATIVO',
      nee: '',
      dados: '',
    },
    {
      id: 22,
      num_chamada: 22,
      nome: 'REBECA BATALHA DA SILVA',
      ra: '115.163.509-1',
      nasc_data: '03/06/2014',
      situacao: 'ATIVO',
      nee: '',
      dados: '',
    },
    {
      id: 23,
      num_chamada: 23,
      nome: 'SOPHIA PEREIRA DE ALMEIDA',
      ra: '115.153.480-8',
      nasc_data: '02/02/2015',
      situacao: 'ATIVO',
      nee: '',
      dados: '',
    },
    {
      id: 24,
      num_chamada: 24,
      nome: 'THOMAS JEFERSON CAMPOS FERREIRA',
      ra: '115.159.490-8',
      nasc_data: '09/10/2014',
      situacao: 'ATIVO',
      nee: '',
      dados: '',
    },
    {
      id: 25,
      num_chamada: 25,
      nome: 'VINICIUS RODRIGUES',
      ra: '115.159.378-3',
      nasc_data: '06/08/2014',
      situacao: 'ATIVO',
      nee: 'Autismo',
      dados: '',
    },
  ])
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
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'ra',
      headerName: 'RA',
      width: 135,
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
      width: 107,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'nee',
      headerName: 'Deficiência',
      width: 130,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'dados',
      headerName: 'Ficha',
      width: 85,
      align: 'center',
      headerAlign: 'center',
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          if (!onlyPortfolio) {
            const gApi: GridApi = params.api
            const fields = gApi
              .getAllColumns()
              .map((c) => c.field)
              .filter((c) => c !== '__check__' && !!c)
            const thisRow: Record<string, CellValue> = {}

            fields.forEach((f) => {
              thisRow[f] = params.getValue(f)
            })

            props.setIdAluno(thisRow['id'])
          } else {
            alert(
              'Sem conexão com o Banco de Dados! Projeto apenas para portfólio.'
            )
          }
        }

        return (
          <Link to='/atualizar-dados' className='go_to' onClick={onClick}>
            <img alt='Go To' className='go_to_icon' src={GoToIcon} />
          </Link>
        )
      },
    },
  ]
  const onlyPortfolio = true

  useEffect(() => {
    if (!onlyPortfolio) {
      api.get(query).then((response) => {
        setAlunos(response.data)
      })
    }
  })

  return (
    <div id='mostra-alunado'>
      <DataGrid
        rows={alunos}
        columns={columns}
        pageSize={10}
        rowHeight={35}
        autoHeight
      />
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    idAluno: state.classe.idAluno,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setIdAluno: (NEW: any) =>
      dispatch({
        type: 'SET_IDALUNO',
        payload: { idAluno: NEW },
      }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MostraAlunado)
