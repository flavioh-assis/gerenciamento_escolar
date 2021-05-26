import React, { useState } from 'react'
import { ColDef, DataGrid, ValueGetterParams } from '@material-ui/data-grid'
import api from '../../services/api'
// import { Link } from 'react-router-dom'

import Input from '../Input'
import Select from '../Select'

import './styles.css'

const columns: ColDef[] = [
  {
    field: 'nome',
    headerName: 'Nome Completo',
    width: 320,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'ano',
    headerName: 'Ano',
    width: 90,
    align: 'center',
    headerAlign: 'center',
    hide: true,
  },
  {
    field: 'turma',
    headerName: 'Turma',
    width: 100,
    align: 'center',
    headerAlign: 'center',
    hide: true,
  },
  {
    field: 'classe',
    headerName: 'Classe',
    width: 110,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (params: ValueGetterParams) => {
      return `${params.getValue('ano')} ${params.getValue('turma')}`
    },
  },
  {
    field: 'ra',
    headerName: 'RA',
    width: 180,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'id',
    headerName: 'RM',
    width: 70,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'nee',
    headerName: 'Deficiência',
    width: 180,
    align: 'center',
    headerAlign: 'center',
  },
]

const DadosMostraPesqAlunos: React.FC = () => {
  const [alunos, setAlunos] = useState([])
  const [dados, setDados] = useState({
    aluno: '',
    ra: '',
    nee: '',
    ano: '',
    turma: '',
    professor: '',
    bairro: '',
  })

  function fazerFiltro() {
    let filter = '?'

    if (dados.aluno) {
      filter += `nome=${dados.aluno}`
    } else if (dados.ra) {
      filter += `&ra=${dados.ra}`
    } else if (dados.nee) {
      filter += `&nee=${dados.nee}`
    } else if (dados.ano) {
      filter += `&ano=${dados.ano}`
    } else if (dados.turma) {
      filter += `&turma=${dados.turma}`
    } else if (dados.professor) {
      filter += `&professor=${dados.professor}`
    } else if (dados.bairro) {
      filter += `&bairro=${dados.bairro}`
    } else {
      filter = ''
    }
    return filter
  }

  function atualizarGrid() {
    let filter = fazerFiltro()

    api.get(`alunos${filter}`).then((response) => {
      setAlunos(response.data)
    })
  }

  function limparCampos() {
    setDados({
      aluno: '',
      ra: '',
      nee: '',
      ano: '',
      turma: '',
      professor: '',
      bairro: '',
    })
  }

  return (
    <div className='dados-pesquisa-alunos'>
      <p id='titulo'>INSIRA UM OU MAIS DADOS</p>
      <div className='dados'>
        <div className='item aluno'>
          <Input
            label='Nome do Aluno(a)'
            name='nome-aluno'
            value={dados.aluno}
            onChange={(t) => setDados({ ...dados, aluno: t.target.value })}
          />
        </div>
        <div className='item ra'>
          <Input
            label='RA'
            name='ra'
            className='ra'
            value={dados.ra}
            onChange={(t) => setDados({ ...dados, ra: t.target.value })}
          />
        </div>
        <div className='item nee'>
          <Select
            label='Deficiência'
            name='nee'
            value={dados.nee}
            onChange={(t) => setDados({ ...dados, nee: t.target.value })}
            options={[
              { value: '', label: 'Indeferente' },
              { value: 'Qualquer', label: 'Qualquer Tipo' },
              { value: 'Autismo', label: 'Autismo' },
              { value: 'Cadeirante', label: 'Cadeirante' },
              { value: 'Intelectual', label: 'Intelectual' },
              { value: 'Múltipla', label: 'Múltipla' },
            ]}
          />
        </div>

        <div className='item ano'>
          <Select
            label='Ano'
            name='ano'
            value={dados.ano}
            onChange={(t) => setDados({ ...dados, ano: t.target.value })}
            options={[
              { value: '', label: '-----' },
              { value: '1º', label: '1º' },
              { value: '2º', label: '2º' },
              { value: '3º', label: '3º' },
              { value: '4º', label: '4º' },
              { value: '5º', label: '5º' },
            ]}
          />
        </div>
        <div className='item turma'>
          <Select
            label='Turma'
            name='turma'
            value={dados.turma}
            onChange={(t) => setDados({ ...dados, turma: t.target.value })}
            options={[
              { value: '', label: '-----' },
              { value: 'A', label: 'A' },
              { value: 'B', label: 'B' },
              { value: 'C', label: 'C' },
              { value: 'D', label: 'D' },
            ]}
          />
        </div>
        <div className='item professor'>
          <Input
            label='Professor(a)'
            name='professor'
            value={dados.professor}
            onChange={(t) => setDados({ ...dados, professor: t.target.value })}
          />
        </div>
        <div className='item bairro'>
          <Input
            label='Bairro'
            name='bairro'
            value={dados.bairro}
            onChange={(t) => setDados({ ...dados, bairro: t.target.value })}
          />
        </div>
      </div>

      <div className='buttons'>
        <input
          type='button'
          id='btn-pesquisar'
          value='Pesquisar'
          onClick={atualizarGrid}
          // onClick={() => alert(JSON.stringify(dados, null, 1))}
        />
        <input
          type='button'
          id='btn-limpar'
          value='Limpar Campos'
          onClick={limparCampos}
        />
      </div>

      <div className='mostra-alunos-pesquisa'>
        <DataGrid
          rows={alunos}
          columns={columns}
          pageSize={10}
          rowHeight={35}
          autoHeight
        />
      </div>
    </div>
  )
}

export default DadosMostraPesqAlunos
