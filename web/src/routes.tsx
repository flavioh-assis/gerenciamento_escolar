import React from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

import CadastrarClasse from "./pages/CadastrarClasse";
import AlterarClasse from "./pages/AlterarClasse";
import Alunado from "./pages/Alunado";
import AtualizarDadosAluno from "./pages/AtualizarDadosAluno";
import ListarClasses from "./pages/ListarClasses";
import MatricularAluno from "./pages/MatricularAluno";
import PesquisarAluno from "./pages/PesquisarAluno";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" Component={ListarClasses} />
      <Route path="/alterar-classe" Component={AlterarClasse} />
      <Route path="/cadastrar-classe" Component={CadastrarClasse} />
      <Route path="/listar-classes" Component={ListarClasses} />
      <Route path="/alunado" Component={Alunado} />
      <Route path="/atualizar-dados" Component={AtualizarDadosAluno} />
      <Route path="/matricular-aluno" Component={MatricularAluno} />
      <Route path="/pesquisar-aluno" Component={PesquisarAluno} />
    </Switch>
  </BrowserRouter>
);

export { Routes };
