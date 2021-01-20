import React from 'react'

import Cabeçalho from '../../components/Cabeçalho'
import DadosPesquisaAlunos from '../../components/DadosPesquisaAlunos'
import Menu from '../../components/Menu'
import MostraAlunosPesquisa from '../../components/BD/MostraAlunosPesquisa'

import './styles.css'

export default () => {
  const filtro = '?nome=&'

  return (
    <div className="container">
      <Cabeçalho titulo="Pesquisar Aluno" endereço="Aluno > Pesquisar" />

      <div className="menu-conteudo">
        <Menu />

        <div className="pesquisar-aluno">
          <DadosPesquisaAlunos />
          <MostraAlunosPesquisa filter={filtro} />
        </div>
      </div>
    </div>
  )
}
