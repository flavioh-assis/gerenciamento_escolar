import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ManageClasses from './pages/CadastrarClasse';
import Alunado from './pages/Alunado';
import AtualizarDadosAluno from './pages/AtualizarDadosAluno';
import MatricularAluno from './pages/MatricularAluno';
import PesquisarAluno from './pages/PesquisarAluno';

export default () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={ManageClasses} />
      <Route path="/gerenciar-classe" Component={ManageClasses} />
      <Route path="/alunado" Component={Alunado} />
      <Route path="/atualizar-dados" Component={AtualizarDadosAluno} />
      <Route path="/matricular-aluno" Component={MatricularAluno} />
      <Route path="/pesquisar-aluno" Component={PesquisarAluno} />
    </Routes>
  </BrowserRouter>
);
