import React from 'react'

import DadosAlunos from '../../components/DadosAlunos'
import Menu from '../../components/Menu'
import Cabeçalho from '../../components/Cabeçalho'

import './styles.css'

export default () => (
  <div className="container">
    <Cabeçalho titulo="Matricular Aluno" endereço="Aluno > Matricular" />
    
    <div className="menu-conteudo">
      <Menu />

      <div className="matricular-aluno">
        <DadosAlunos />
      </div>

    </div>
  </div>
)
