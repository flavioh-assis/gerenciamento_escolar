import React from 'react'

import DadosAlunos from '../../components/DadosAlunos'
import Menu from '../../components/Menu'
import Cabeçalho from '../../components/Cabeçalho'
import Rodape from '../../components/Rodape'

import './styles.css'

export default () => (
  <div className="container">
    <Cabeçalho titulo="Atualizar Dados" endereço="Aluno > Atualizar Dados" />
    
    <div className="menu-conteudo">
      <Menu />

      <div className="atualizar-dados">
        <DadosAlunos />
      </div>

    </div>
    <Rodape />
  </div>
)
