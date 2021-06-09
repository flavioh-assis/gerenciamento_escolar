import React from 'react'

import DadosAlunosAtualizar from '../../components/DadosAlunosAtualizar'
import Menu from '../../components/Menu'
import Cabeçalho from '../../components/Cabeçalho'

import './styles.css'

export default () => (
  <div className='container'>
    <Cabeçalho titulo='Atualizar Dados' endereço='Aluno > Atualizar Dados' />

    <div className='menu-conteudo'>
      <Menu />

      <div className='atualizar-dados'>
        <DadosAlunosAtualizar />
      </div>
    </div>
  </div>
)
