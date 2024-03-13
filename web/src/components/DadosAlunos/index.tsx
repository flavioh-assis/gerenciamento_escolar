import React, { useState } from 'react';
import Input from '../Input';
import Select from '../Select';
import { EnrollOptions, States, buildSelectOption } from '../../constants';
import './styles.css';

type Props = {
  classes: any[];
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const DadosAlunos = ({ classes, handleSubmit }: Props) => {
  const [anoDesejado, setAnoDesejado] = useState<string>('');

  const buildGradeOptions = (classes: any[]) => {
    const grades: string[] = Array.from(new Set(classes.map(x => x.ano)));

    return grades.map(ano => buildSelectOption(ano, `${ano} ano`));
  };

  const buildGroupOptions = (classes: any[]) => {
    const groups: { turma: string }[] = classes.filter(x => x.ano === anoDesejado);

    return groups.map(x => buildSelectOption(x.turma));
  };

  const options = {
    grades: buildGradeOptions(classes),
    groups: buildGroupOptions(classes),
    disabilities: EnrollOptions.DISABITIES,
  };

  const handleGradeChange = (value: string) => {
    setAnoDesejado(value);
  };

  return (
    <form onSubmit={handleSubmit} className="dados-alunos">
      <h2>IDENTIFICAÇÃO</h2>

      <div className="section identificaçao">
        <div className="item aluno">
          <Input label="Nome do Aluno" name="nome" className="item aluno" />
        </div>
        <div className="item ra">
          <Input className="ra" label="RA" name="ra" />
        </div>
        <div className="item nee">
          <Select label="Deficiência" name="nee" options={options.disabilities} />
        </div>

        <div className="item localidade">
          <Input label="Cidade" name="nasc_cidade" />
        </div>
        <div className="item uf-nasc">
          <Select
            label="UF"
            name="nasc_uf"
            options={States.map(UF => ({ value: UF, label: UF }))}
          />
        </div>
        <div className="item nacionalidade">
          <Input label="Nacionalidade" name="nacionalidade" />
        </div>
        <div className="item data-nasc">
          <Input label="Data Nasc." name="nasc_data" />
        </div>

        <div className="item pai">
          <Input label="Nome do Pai" name="pai" />
        </div>
        <div className="item mae">
          <Input label="Nome da Mãe" name="mae" />
        </div>
        <div className="item responsavel">
          <Input label="Nome do Responsável Legal" name="responsavel" />
        </div>
      </div>

      <h2>MATRICULA</h2>

      <div className="section matricula">
        <div className="ano-desejado">
          <Select
            label="Ano"
            name="ano_desejado"
            onChange={e => handleGradeChange(e.target.value)}
            options={options.grades}
          />
        </div>
        <div className="turma">
          <Select label="Turma" name="turma" options={options.groups} />
        </div>
      </div>

      <div className="buttons">
        <button type="submit" className="button btn-submit">
          Matricular Aluno
        </button>

        <button type="reset" className="button btn-clear">
          Limpar Campos
        </button>
      </div>
    </form>
  );
};
