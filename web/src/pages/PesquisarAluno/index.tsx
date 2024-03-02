import React, { useState } from 'react';
import Cabeçalho from '../../components/Cabeçalho';
import Menu from '../../components/Menu';
import { FormTableStudents } from '../../components/DadosMostraPesqAlunos';
import { SearchStudentResult, StudentFilter } from '../../types';
import { api } from '../../services/api';
import './styles.css';

const SearchStudents = () => {
  const filterInitialState: StudentFilter = {
    nome: '',
    ra: '',
    nee: '',
    ano: '',
    turma: '',
    professor: '',
    periodo: '',
  };
  const [students, setStudents] = useState<SearchStudentResult[]>([]);
  const [filterValues, setFilterValues] = useState(filterInitialState);
  const { ano, nee, nome, periodo, professor, ra, turma } = filterValues;

  const buildFilter = () => {
    const filters = [];

    for (const key in filterValues) {
      if (filterValues[key as keyof StudentFilter]) {
        filters.push(`${key}=${filterValues[key as keyof StudentFilter]}`);
      }
    }

    return filters.length ? '?' + filters.join('&') : '';
  };

  const clearFields = () => {
    setFilterValues(filterInitialState);
  };

  const handleChange = (value: object) => {
    setFilterValues(Object.assign({}, filterValues, value));
  };

  const handleSubmit = () => {
    let filter = buildFilter();

    api.get(`alunos${filter}`).then(response => {
      setStudents(response.data);
    });
  };

  return (
    <div className="container">
      <Cabeçalho titulo="Pesquisar Aluno" endereço="Aluno > Pesquisar" />

      <div className="menu-conteudo">
        <Menu />

        <div className="pesquisar-aluno">
          <FormTableStudents
            disability={nee}
            grade={ano}
            group={turma}
            name={nome}
            period={periodo}
            studentRegistration={ra}
            students={students}
            teacher={professor}
            clearFields={clearFields}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchStudents;
