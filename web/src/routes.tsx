import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import CadastrarClasse from './pages/CadastrarClasse'
import AlterarClasse from './pages/AlterarClasse'
import Alunado from './pages/Alunado'
import AtualizarDadosAluno from './pages/AtualizarDadosAluno'
import ListarClasses from './pages/ListarClasses'
import MatricularAluno from './pages/MatricularAluno'
import PesquisarAluno from './pages/PesquisarAluno'

export default () => (
  <BrowserRouter>
    <Route path="/" exact component={ListarClasses} />

    <Route path="/alterar-classe" component={AlterarClasse} />
    <Route path="/cadastrar-classe" component={CadastrarClasse} />
    <Route path="/listar-classes" component={ListarClasses} />

    <Route path="/alunado" component={Alunado} />
    <Route path="/atualizar-dados" component={AtualizarDadosAluno} />
    <Route path="/matricular-aluno" component={MatricularAluno} /> 
    <Route path="/pesquisar-aluno" component={PesquisarAluno} />
  </BrowserRouter>
)
