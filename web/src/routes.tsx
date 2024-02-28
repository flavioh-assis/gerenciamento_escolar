import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Alunado from './pages/Alunado';
import MatricularAluno from './pages/MatricularAluno';
import PesquisarAluno from './pages/PesquisarAluno';
import ManageClasses from './pages/CadastrarClasse';

export default () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={ManageClasses} />
      <Route path="/alunado" Component={Alunado} />
      <Route path="/matricular-aluno" Component={MatricularAluno} />
      <Route path="/pesquisar-aluno" Component={PesquisarAluno} />
      <Route path="/gerenciar-classe" Component={ManageClasses} />
    </Routes>
  </BrowserRouter>
);
