import React, { useState, FormEvent } from 'react'

import api from '../../services/api'
import Input from '../../components/Input'
import Select from '../../components/Select'

import './styles.css'

export default () => {
  const [ano, setAno] = useState('')
  const [turma, setTurma] = useState('')
  const [periodo, setPeriodo] = useState('')
  const [sala, setSala] = useState('')
  const [professor, setProfessor] = useState('')

  function handleCadastrar(e: FormEvent) {
    e.preventDefault()

    if ([ano, turma, periodo, sala].includes('')) {
      alert('ERRO! Preencha os campos ANO, TURMA, PERÍODO e SALA.')
    } else {
      api
        .post('classes', {
          ano,
          turma,
          periodo,
          sala,
          professor
        })
        .then(() => {
          alert('Cadastro feito com sucesso!')
        })
        .catch(error => {
          alert('Deu ruim: ' + error)
        })
    }
  }

  return (
    <div className="selecao-classes">
      <form onSubmit={handleCadastrar}>
        <Select
          name="ano"
          label="Ano"
          value={ano}
          onChange={t => {
            setAno(t.target.value)
          }}
          options={[
            { value: '1º', label: '1º' },
            { value: '2º', label: '2º' },
            { value: '3º', label: '3º' },
            { value: '4º', label: '4º' },
            { value: '5º', label: '5º' }
          ]}
        />

        <Select
          name="turma"
          label="Turma"
          value={turma}
          onChange={t => {
            setTurma(t.target.value)
          }}
          options={[
            { value: 'A', label: 'A' },
            { value: 'B', label: 'B' },
            { value: 'C', label: 'C' },
            { value: 'D', label: 'D' }
          ]}
        />

        <Select
          name="periodo"
          label="Periodo"
          value={periodo}
          onChange={t => {
            setPeriodo(t.target.value)
          }}
          options={[
            { value: 'Manhã', label: 'Manhã' },
            { value: 'Tarde', label: 'Tarde' }
          ]}
        />

        <Select
          name="sala"
          label="Sala"
          value={sala}
          onChange={t => {
            setSala(t.target.value)
          }}
          options={[
            { value: '01', label: '01' },
            { value: '02', label: '02' },
            { value: '03', label: '03' },
            { value: '04', label: '04' },
            { value: '05', label: '05' },
            { value: '06', label: '06' },
            { value: '07', label: '07' },
            { value: '08', label: '08' },
            { value: '09', label: '09' }
          ]}
        />

        <Input
          label="Professor"
          name="professor"
          id="professor"
          value={professor}
          onChange={t => setProfessor(t.target.value)}
        />

        <input
          type="submit"
          className="botao"
          onClick={handleCadastrar}
          value="Cadastrar"
        />
      </form>
    </div>
  )
}
