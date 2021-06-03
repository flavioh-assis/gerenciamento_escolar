import React from 'react'

import DadosClasseSelecionada from '../../components/DadosClasseSelecionada'
import Menu from '../../components/Menu'
import Cabeçalho from '../../components/Cabeçalho'

import './styles.css'

export default () => (
  <div className="container">
    <Cabeçalho titulo="Alterar Classe" endereço="Classe > Alterar" />
    
    <div className="menu-conteudo">
      <Menu />

      <div className="conteudo">
        <DadosClasseSelecionada />
      </div>

    </div>
  </div>
)
