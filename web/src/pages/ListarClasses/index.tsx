import React from 'react'

import Menu from '../../components/Menu'
import MostraClassesCompleta from '../../components/BD/MostraClassesCompleta'
import Cabeçalho from '../../components/Cabeçalho'
import Rodape from '../../components/Rodape'

import './styles.css'

export default () => (
  <div className="container">
    <Cabeçalho titulo="Listar Classe" endereço="Classe > Listar" />
    
    <div className="menu-conteudo">
      <Menu />

      <div className="listar-classe">
        <MostraClassesCompleta />
      </div>

    </div>
    <Rodape />
  </div>
)