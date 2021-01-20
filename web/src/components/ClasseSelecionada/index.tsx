import React, { useState, FormEvent } from 'react'

import api from '../../services/api'
import Input from '../Input'

import './styles.css'

export default () => {
  const [vAno, setAno] = useState('')
  const [vTurma, setTurma] = useState('')
  const [vPeriodo, setPeriodo] = useState('')
  const [vSala, setSala] = useState('')
  const [vProfessor, setProfessor] = useState('')
  
  function handleSalvar(e: FormEvent) {
    e.preventDefault();
    
    api.post('/classes', {
      vAno,
      vTurma,
      vPeriodo,
      vSala,
      vProfessor
    }).then(() => {
      alert('Cadastro realizado com sucesso!')
    }).catch((e) => {
      alert('Deu ruim: ' + e)
      console.log('Deu ruim: ' + e.response.request._response)
    })
  }
  
  return (
    <div className="classe-selecao">
      <Input name="ano" label="Ano" disabled />
      <Input name="turma" label="Turma" disabled />
      <Input name="periodo" label="Periodo" disabled />
      <Input name="sala" label="Sala" disabled />

      <Input label="Professor" name="professor" id="professor" />
      
      <input type="button" className="botao" onClick={handleSalvar} value="Salvar" />

    </div>
  )
}
