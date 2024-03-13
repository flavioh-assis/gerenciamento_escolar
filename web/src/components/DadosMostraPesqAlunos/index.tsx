import React from 'react';
import Input from '../Input';
import Select from '../Select';
import { SearchOptions } from '../../constants';
import { Period, SearchStudentResult } from '../../types';
import './styles.css';

type Props = {
  disability: string;
  grade: string;
  group: string;
  name: string;
  period: Period | '';
  studentRegistration: string;
  students: SearchStudentResult[];
  teacher: string;
  clearFields: () => void;
  handleChange: (value: object) => void;
  handleSubmit: () => void;
};

export const FormTableStudents = ({
  disability,
  grade,
  group,
  name,
  period,
  studentRegistration,
  students,
  teacher,
  clearFields,
  handleChange,
  handleSubmit,
}: Props) => {
  return (
    <div className="dados-pesquisa-alunos">
      <h2 id="titulo">INSIRA UM OU MAIS DADOS</h2>

      <div className="dados">
        <div className="item aluno">
          <Input
            label="Nome do Aluno(a)"
            name="nome-aluno"
            value={name}
            onChange={t => handleChange({ nome: t.target.value })}
          />
        </div>
        <div className="item ra">
          <Input
            label="RA"
            name="ra"
            className="ra"
            value={studentRegistration}
            onChange={t => handleChange({ ra: t.target.value })}
          />
        </div>
        <div className="item nee">
          <Select
            label="Deficiência"
            name="nee"
            value={disability}
            onChange={t => handleChange({ nee: t.target.value })}
            options={SearchOptions.DISABITIES}
          />
        </div>

        <div className="item ano">
          <Select
            label="Ano"
            name="ano"
            value={grade}
            onChange={t => handleChange({ ano: t.target.value })}
            options={SearchOptions.GRADES}
          />
        </div>
        <div className="item turma">
          <Select
            label="Turma"
            name="turma"
            value={group}
            onChange={t => handleChange({ turma: t.target.value })}
            options={SearchOptions.GROUPS}
          />
        </div>
        <div className="item professor">
          <Input
            label="Professor(a)"
            name="professor"
            value={teacher}
            onChange={t => handleChange({ professor: t.target.value })}
          />
        </div>
        <div className="item bairro">
          <Select
            label="Período"
            name="periodo"
            value={period}
            onChange={t => handleChange({ periodo: t.target.value })}
            options={SearchOptions.PERIODS}
          />
        </div>
      </div>

      <div className="buttons">
        <button id="btn-pesquisar" onClick={handleSubmit}>
          Pesquisar
        </button>

        <button id="btn-limpar" onClick={clearFields}>
          Limpar Campos
        </button>
      </div>

      <div className="mostra-alunos-pesquisa">
        <table
          style={{
            background: '#eee',
            padding: '10px',
            borderCollapse: 'collapse',
            width: '100%',
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: '8px', border: '1px solid #bbb', textAlign: 'left' }}>RM</th>
              <th style={{ padding: '8px', border: '1px solid #bbb', textAlign: 'left' }}>Nome</th>
              <th style={{ padding: '8px', border: '1px solid #bbb', textAlign: 'left' }}>
                Classe
              </th>
              <th style={{ padding: '8px', border: '1px solid #bbb', textAlign: 'left' }}>
                Professor
              </th>
            </tr>
          </thead>

          <tbody>
            {students.length ? (
              students.map((s, index) => (
                <tr key={index}>
                  <td style={{ padding: '8px', border: '1px solid #bbb' }}>{s.id}</td>
                  <td style={{ padding: '8px', border: '1px solid #bbb' }}>{s.nome}</td>
                  <td style={{ padding: '8px', border: '1px solid #bbb' }}>
                    {s.ano} ano {s.turma}
                  </td>
                  <td style={{ padding: '8px', border: '1px solid #bbb' }}>{s.professor}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  style={{ padding: '8px', border: '1px solid #bbb', textAlign: 'center' }}
                >
                  Sem resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
