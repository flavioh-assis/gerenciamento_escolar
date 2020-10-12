import React from 'react'

import Menu from '../../components/Menu'
import MostraClasses from '../../components/BD/MostraClasses'
import Cabeçalho from '../../components/Cabeçalho'
import Rodape from '../../components/Rodape'
import SelecaoClasses from '../../components/SelecaoClasses'

import './styles.css'

export default () => (
  <div className="container">
    <Cabeçalho titulo="Cadastrar Classe" endereço="Classe > Cadastrar" />
    
    <div className="menu-conteudo">
      <Menu />

      <div className="conteudo">
        <SelecaoClasses />
        <MostraClasses />
      </div>

    </div>
    <Rodape />
  </div>
)
