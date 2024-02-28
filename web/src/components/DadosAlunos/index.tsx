import React, { FormEvent } from 'react';
import Input from '../Input';
import Select from '../Select';
import { States } from '../../constants';
import { FormStudentValues } from '../../types';
import './styles.css';

type Props = {
  classes: any[];
  clearFields: VoidFunction;
  formStudentValues: FormStudentValues;
  handleChange: (value: Object) => void;
  handleSubmit: (e: FormEvent) => void;
};

export const DadosAlunos = ({
  classes,
  clearFields,
  formStudentValues,
  handleChange,
  handleSubmit,
}: Props) => {
  const grades: string[] = Array.from(new Set(classes.map(x => x.ano)));
  const groups: { turma: string }[] = classes.filter(x => x.ano === formStudentValues.ano_desejado);

  const options = {
    grades: grades.map(ano => ({ value: ano, label: `${ano} ano` })),
    groups: groups.map(({ turma }) => ({ value: turma, label: turma })),
    disabilities: [
      { value: '', label: 'Não Possui' },
      { value: 'Autismo', label: 'Autismo' },
      { value: 'Cadeirante', label: 'Cadeirante' },
      { value: 'Intelectual', label: 'Intelectual' },
      { value: 'Múltipla', label: 'Múltipla' },
    ],
    pastGrades: [
      { value: 'Não cursou', label: 'Não cursou' },
      { value: 'Pré-escola', label: 'Pré-escola' },
      { value: '1º ano', label: '1º ano' },
      { value: '2º ano', label: '2º ano' },
      { value: '3º ano', label: '3º ano' },
      { value: '4º ano', label: '4º ano' },
      { value: '5º ano', label: '5º ano' },
    ],
  };

  return (
    <form onSubmit={handleSubmit} className="dados-alunos">
      <h2>IDENTIFICAÇÃO</h2>

      <div className="section identificaçao">
        <div className="item aluno">
          <Input
            label="Nome do Aluno"
            name="nome-aluno"
            onChange={t => handleChange({ nome: t.target.value })}
            value={formStudentValues.nome}
          />
        </div>
        <div className="item ra">
          <Input
            className="ra"
            label="RA"
            name="ra"
            value={formStudentValues.ra}
            onChange={t => handleChange({ ra: t.target.value })}
          />
        </div>
        <div className="item nee">
          <Select
            label="Deficiência"
            name="nee"
            value={formStudentValues.nee}
            onChange={e => handleChange({ nee: e.target.value })}
            options={options.disabilities}
          />
        </div>

        <div className="item localidade">
          <Input
            label="Cidade"
            name="localidade"
            value={formStudentValues.nasc_cidade}
            onChange={t => handleChange({ nasc_cidade: t.target.value })}
          />
        </div>
        <div className="item uf-nasc">
          <Select
            label="UF"
            name="uf-nasc"
            value={formStudentValues.nasc_uf}
            onChange={e => handleChange({ nasc_uf: e.target.value })}
            options={States.map((UF: string) => {
              return { value: UF, label: UF };
            })}
          />
        </div>
        <div className="item nacionalidade">
          <Input
            label="Nacionalidade"
            name="nacionalidade"
            value={formStudentValues.nacionalidade}
            onChange={t => handleChange({ nacionalidade: t.target.value })}
          />
        </div>
        <div className="item data-nasc">
          <Input
            label="Data Nasc."
            name="data-nasc"
            onChange={t => {
              // deveria ter REGEX
              if ([1, 4].includes(formStudentValues.nasc_data.length)) {
                handleChange({ nasc_data: t.target.value + '/' });
              } else {
                handleChange({ nasc_data: t.target.value });
              }
            }}
            value={formStudentValues.nasc_data}
          />
        </div>

        <div className="item pai">
          <Input
            label="Nome do Pai"
            name="nome-pai"
            onChange={t => handleChange({ pai: t.target.value })}
            value={formStudentValues.pai}
          />
        </div>
        <div className="item mae">
          <Input
            label="Nome da Mãe"
            name="nome-mae"
            onChange={t => handleChange({ mae: t.target.value })}
            value={formStudentValues.mae}
          />
        </div>
        <div className="item responsavel">
          <Input
            label="Nome do Responsável Legal"
            name="nome-resp-legal"
            onChange={t => {
              handleChange({ responsavel: t.target.value });
            }}
            value={formStudentValues.responsavel}
          />
        </div>
      </div>

      <h2>PROCEDÊNCIA</h2>

      <div className="section procedencia">
        <div className="proc_escola">
          <Input
            label="Escola"
            name="proc_escola"
            value={formStudentValues.proc_escola}
            onChange={t => handleChange({ proc_escola: t.target.value })}
          />
        </div>
        <div className="cidade">
          <Input
            label="Cidade"
            name="cidade"
            value={formStudentValues.proc_cidade}
            onChange={t => handleChange({ proc_cidade: t.target.value })}
          />
        </div>
        <div className="ano-proc">
          <Select
            label="Ano"
            name="ano-proc"
            value={formStudentValues.proc_ano}
            onChange={e => handleChange({ proc_ano: e.target.value })}
            options={options.pastGrades}
          />
        </div>
        <div className="ano-desejado">
          <Select
            label="Ano Desejado"
            name="ano-desejado"
            value={formStudentValues.ano_desejado}
            onChange={e => handleChange({ ano_desejado: e.target.value })}
            options={options.grades}
          />
        </div>
        <div className="turma">
          <Select
            label="Turma"
            name="turma"
            value={formStudentValues.turma}
            onChange={e => handleChange({ turma: e.target.value })}
            options={options.groups}
          />
        </div>
      </div>

      <div className="buttons">
        <input type="submit" id="btn-matricular" value="Matricular Aluno" />
        <input type="button" id="btn-limpar" value="Limpar Campos" onClick={clearFields} />
      </div>
    </form>
  );
};
