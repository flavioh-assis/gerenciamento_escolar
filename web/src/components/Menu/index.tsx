import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default () => (
  <div className="menu">
    <div className="menu-div">
      <p>Alunos</p>
      <Link to="/alunado">Alunado</Link>
      {/* <Link to="/atualizar-dados">Atualizar Dados</Link> */}
      <Link to="/matricular-aluno">Matricular</Link>
      <Link to="/pesquisar-aluno">Pesquisar</Link>
    </div>

    <div className="menu-div">
      <p>Classes</p>
      <Link to="/gerenciar-classe">Gerenciar</Link>
    </div>
  </div>
);
