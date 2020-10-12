import React from 'react'

import Menu from '../../components/Menu'
import Cabeçalho from '../../components/Cabeçalho'
import Rodape from '../../components/Rodape'
import TabsAlunado from '../../components/TabsAlunado'

import './styles.css'

export default () => (
  <div className="container">
    <Cabeçalho titulo="Alunado Classe" endereço="Aluno > Alunado" />
    
    <div className="menu-conteudo">
      <Menu />

      <div className="alunado">
        <TabsAlunado />
      </div>

    </div>
    <Rodape />
  </div>
)
