import React from 'react';
import Input from '../Input';
import Select from '../Select';
import { SearchOptions } from '../../constants';
import './styles.css';

type Props = {
  handleClearResult: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const FormSearchStudents = ({ handleClearResult, handleSubmit }: Props) => {
  return (
    <form className="dados-pesquisa-alunos" onSubmit={handleSubmit}>
      <h2 id="titulo">INSIRA UM OU MAIS DADOS</h2>

      <div className="dados">
        <div className="item aluno">
          <Input label="Nome do Aluno(a)" name="nome" />
        </div>
        <div className="item ra">
          <Input label="RA" name="ra" className="ra" />
        </div>
        <div className="item nee">
          <Select label="Deficiência" name="nee" options={SearchOptions.DISABITIES} />
        </div>

        <div className="item ano">
          <Select label="Ano" name="ano" options={SearchOptions.GRADES} />
        </div>
        <div className="item turma">
          <Select label="Turma" name="turma" options={SearchOptions.GROUPS} />
        </div>
        <div className="item professor">
          <Input label="Professor(a)" name="professor" />
        </div>
        <div className="item bairro">
          <Select label="Período" name="periodo" options={SearchOptions.PERIODS} />
        </div>
      </div>

      <div className="buttons">
        <button type="submit" className="button btn-submit">
          Pesquisar
        </button>

        <button type="reset" className="button btn-clear">
          Limpar Campos
        </button>

        <button type="button" className="button btn-clear" onClick={handleClearResult}>
          Limpar Resultado
        </button>
      </div>
    </form>
  );
};
