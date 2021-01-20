import React from 'react'

import ClasseSelecionada from '../../components/ClasseSelecionada'
import Menu from '../../components/Menu'
import MostraClasses from '../../components/BD/MostraClasses'
import Cabeçalho from '../../components/Cabeçalho'

import './styles.css'

export default () => (
  <div className="container">
    <Cabeçalho titulo="Alterar Classe" endereço="Classe > Alterar" />
    
    <div className="menu-conteudo">
      <Menu />

      <div className="conteudo">
        <ClasseSelecionada />
        <MostraClasses />
      </div>

    </div>
  </div>
)
