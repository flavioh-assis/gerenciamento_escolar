import React, { useEffect, useState } from 'react';
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
    ano_desejado: '',
    turma: '',
  };
  const [classes, setClasses] = useState<Object[]>([]);

  const clearFields = (elements: HTMLFormControlsCollection) => {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLInputElement | HTMLSelectElement;
      element.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = initialState;
    const elements = e.currentTarget.elements;

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLInputElement | HTMLSelectElement;
      if (element.id) {
        formData[element.id as keyof FormStudentValues] = element.value;
      }
    }

    api
      .post('alunos', formData)
      .then(({ data }) => {
        alert(`Cadastro feito com sucesso!\nO RM gerado foi o ${data.enrollmentRegistration}.`);
        clearFields(elements);
      })
      .catch(error => {
        alert(`Deu ruim: ${error}`);
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
          <DadosAlunos classes={classes} handleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
