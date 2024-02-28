import React, { FormEvent, useEffect, useState } from 'react';
import { DadosAlunos } from '../../components/DadosAlunos';
import Menu from '../../components/Menu';
import Cabeçalho from '../../components/Cabeçalho';
import { getClasses } from '../CadastrarClasse';
import { FormStudentValues } from '../../types';
import { api } from '../../services/api';
import './styles.css';

export default () => {
  const initialState: FormStudentValues = {
    nome: '',
    ra: '',
    nee: '',
    nasc_cidade: '',
    nasc_uf: '',
    nacionalidade: '',
    nasc_data: '',
    pai: '',
    mae: '',
    responsavel: '',
    proc_escola: '',
    proc_cidade: '',
    proc_ano: '',
    ano_desejado: '',
    turma: '',
  };
  const [classes, setClasses] = useState<Object[]>([]);
  const [formStudentValues, setFormStudentValues] = useState<FormStudentValues>(initialState);

  const clearFields = () => {
    setFormStudentValues(initialState);
  };

  const handleChange = (value: Object) => {
    setFormStudentValues(Object.assign({}, formStudentValues, value));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    api
      .post('alunos', {
        ...formStudentValues,
      })
      .then(({ data }) => {
        alert(
          'Cadastro feito com sucesso!\nO RM gerado foi o ' + data.enrollmentRegistration + '.'
        );
        clearFields();
      })
      .catch(error => {
        alert('Deu ruim: ' + error);
      });
  };

  useEffect(() => {
    const classes = async () => {
      const result = await getClasses();
      setClasses(result);
    };

    classes();
  }, []);

  return (
    <div className="container">
      <Cabeçalho titulo="Matricular Aluno" endereço="Aluno > Matricular" />

      <div className="menu-conteudo">
        <Menu />

        <div className="matricular-aluno">
          <DadosAlunos
            classes={classes}
            clearFields={clearFields}
            formStudentValues={formStudentValues}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};
