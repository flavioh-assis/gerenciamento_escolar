import React from 'react'

import ClasseSelecionada from '../../components/ClasseSelecionada'
import Menu from '../../components/Menu'
import MostraClassesEditar from '../../components/BD/MostraClassesEditar'
import Cabeçalho from '../../components/Cabeçalho'

import './styles.css'

export default () => (
  <div className="container">
    <Cabeçalho titulo="Alterar Classe" endereço="Classe > Alterar" />
    
    <div className="menu-conteudo">
      <Menu />

      <div className="conteudo">
        <ClasseSelecionada />
        <MostraClassesEditar />
      </div>

    </div>
  </div>
)
