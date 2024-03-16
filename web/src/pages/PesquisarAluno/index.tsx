import React, { FormEvent, useState } from 'react';
import Cabeçalho from '../../components/Cabeçalho';
import Menu from '../../components/Menu';
import { FormSearchStudents, TableSearchStudents } from '../../components';
import { SearchStudentResult, StudentFilter } from '../../types';
import { keyBelongsToObject } from '../../utils';
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

  const buildFilter = (formData: StudentFilter) => {
    const filters = Object.keys(formData).reduce((acc: string[], key) => {
      const value = formData[key as keyof StudentFilter];
      acc.push(`${key}=${value}`);

      return acc;
    }, []);

    return filters.length ? buildFilterString(filters) : '';
  };

  const buildFilterString = (filters: string[]) => {
    return '?' + filters.join('&');
  };

  const clearStudents = () => {
    setStudents([]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {} as StudentFilter;
    const elements = e.currentTarget.elements;

    for (const element of elements) {
      const { id, value } = element as HTMLInputElement | HTMLSelectElement;

      if (keyBelongsToObject(id, filterInitialState) && value) {
        formData[id as keyof StudentFilter] = value;
      }
    }

    const filter = buildFilter(formData);

    api
      .get(`alunos${filter}`)
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        alert(`Deu ruim: ${error}`);
      });
  };

  return (
    <div className="container">
      <Cabeçalho titulo="Pesquisar Aluno" endereço="Aluno > Pesquisar" />

      <div className="menu-conteudo">
        <Menu />

        <div className="pesquisar-aluno">
          <FormSearchStudents handleSubmit={handleSubmit} handleClearResult={clearStudents} />

          <TableSearchStudents students={students} />
        </div>
      </div>
    </div>
  );
};

export default SearchStudents;
