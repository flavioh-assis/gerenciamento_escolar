import React from 'react';
import { SearchStudentResult } from '../../types';
import './styles.css';

type Props = {
  students: SearchStudentResult[];
};

export const TableSearchStudents = ({ students }: Props) => {
  return (
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
            <th style={{ padding: '8px', border: '1px solid #bbb', textAlign: 'left' }}>Classe</th>
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
  );
};
