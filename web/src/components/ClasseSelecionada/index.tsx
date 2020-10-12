import React from 'react'
import { Link } from 'react-router-dom'

import Input from '../Input'

import './styles.css'

export default () => {
  return (
    <div className="classe-selecao">
      <Input name="ano" label="Ano" disabled />
      <Input name="turma" label="Turma" disabled />
      <Input name="periodo" label="Periodo" disabled />
      <Input name="sala" label="Sala" disabled />

      <Input label="Professor" name="professor" id="professor" />

      <Link to="/" className="botao">
        Salvar
      </Link>
    </div>
  )
}
