import React from 'react'

import DadosPesquisaAlunos from '../../components/DadosPesquisaAlunos'
import Menu from '../../components/Menu'
import MostraAlunos from '../../components/BD/MostraAlunos'
import Cabeçalho from '../../components/Cabeçalho'
import Rodape from '../../components/Rodape'

import './styles.css'

export default () => (
  <div className="container">
    <Cabeçalho titulo="Pesquisar Aluno" endereço="Aluno > Pesquisar" />
    
    <div className="menu-conteudo">
      <Menu />

      <div className="pesquisar-aluno">
        <DadosPesquisaAlunos />
        <MostraAlunos />
      </div>

    </div>
    <Rodape />
  </div>
)
