import React from 'react'
import { Link } from 'react-router-dom'

import Input from '../Input'
import Select from '../Select'

import './styles.css'

export default () => {
  return (
    <form action="" method="post" className="dados-pesquisa-alunos">
      <p>INSIRA UM OU MAIS DADOS</p>
      <div className="dados">
        <div className="item aluno">
          <Input
            label="Nome do Aluno(a)"
            name="nome-aluno"
            value="Vitor Augusto das Neves Martins de Almeida Santos"
          />
        </div>

        <div className="item ra">
          <Input label="RA" name="ra" className="ra" value="44.937.520-X" />
        </div>
        <div className="item rm">
          <Input label="RM" name="rm" className="item rm" value="12.345" />
        </div>
        <div className="item nee">
          <Select
            label="Deficiência"
            name="nee"
            options={[
              { value: '', label: 'Indeferente' },
              { value: 'Qualquer', label: 'Qualquer Tipo' },
              { value: 'Autismo Infantil', label: 'Autismo Infantil' },
              { value: 'Cadeirante', label: 'Cadeirante' },
              { value: 'Intelectual', label: 'Intelectual' },
              { value: 'Múltipla', label: 'Múltipla' }
            ]}
          />
        </div>
        <div className="item ano">
          <Select
            label="Ano"
            name="ano"
            options={[
              { value: '', label: '-----' },
              { value: '1º', label: '1º' },
              { value: '2º', label: '2º' },
              { value: '3º', label: '3º' },
              { value: '4º', label: '4º' },
              { value: '5º', label: '5º' }
            ]}
          />
        </div>
        <div className="item turma">
          <Select
            label="Turma"
            name="turma"
            options={[
              { value: '', label: '-----' },
              { value: 'A', label: 'A' },
              { value: 'B', label: 'B' },
              { value: 'C', label: 'C' },
              { value: 'D', label: 'D' }
            ]}
          />
        </div>

        <div className="item professor">
          <Input
            label="Professor(a)"
            name="professor"
            value="Adriana Bonavena"
          />
        </div>
        <div className="bairro">
          <Input label="Bairro" name="bairro" value="Jardim Regina Volpato" />
        </div>
        <div className="cidade">
          <Input label="Cidade" name="cidade" value="Cravinhos" />
        </div>
      </div>

      <div className="buttons">
        <input type="button" id="btn-pesquisar" value="Pesquisar" />
        <input type="button" id="btn-limpar" value="Limpar Campos" />
      </div>
    </form>
  )
}
