import React from 'react'

import Cabeçalho from '../../components/Cabeçalho'
import DadosMostraPesqAlunos from '../../components/DadosMostraPesqAlunos'
import Menu from '../../components/Menu'

import './styles.css'

export default () => {

  return (
    <div className="container">
      <Cabeçalho titulo="Pesquisar Aluno" endereço="Aluno > Pesquisar" />

      <div className="menu-conteudo">
        <Menu />

        <div className="pesquisar-aluno">
          <DadosMostraPesqAlunos/>
        </div>
      </div>
    </div>
  )
}
