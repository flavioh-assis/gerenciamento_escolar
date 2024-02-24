import React, { FormEvent } from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { Period } from '../../types';
import './styles.css';

type Props = {
  grade: string;
  group: string;
  period: '' | Period;
  classroom: string;
  teacher: string;
  availableGrades: string[];
  availableGroups: string[];
  availableRooms: string[];
  availablePeriods: Period[];
  idClassEdit: number;
  handleChangeClassroom: (room: string) => void;
  handleChangeGrade: (grade: string) => void;
  handleChangeGroup: (group: string) => void;
  handleChangePeriod: (period: string) => void;
  handleChangeTeacher: (teacher: string) => void;
  handleSubmit: (e: FormEvent) => void;
};

export const ClassSelection = ({
  classroom,
  grade,
  group,
  period,
  teacher,
  availableGrades,
  availableGroups,
  availableRooms,
  availablePeriods,
  idClassEdit,
  handleChangeClassroom,
  handleChangeGrade,
  handleChangeGroup,
  handleChangePeriod,
  handleChangeTeacher,
  handleSubmit,
}: Props) => {
  const buildOptions = (availableItems: string[]) => {
    return availableItems.map(item => ({ value: item, label: item }));
  };

  const gradeOptions = buildOptions(availableGrades);
  const groupOptions = buildOptions(availableGroups);
  const periodOptions = buildOptions(availablePeriods);
  const roomOptions = buildOptions(availableRooms);

  return (
    <div className="selecao-classes">
      <form onSubmit={handleSubmit}>
        <Select
          name="ano"
          label="Ano"
          value={grade}
          onChange={e => handleChangeGrade(e.target.value)}
          options={gradeOptions}
        />

        <Select
          name="turma"
          label="Turma"
          value={group}
          onChange={e => handleChangeGroup(e.target.value)}
          options={groupOptions}
        />

        <Select
          name="periodo"
          label="Periodo"
          value={period}
          onChange={e => handleChangePeriod(e.target.value)}
          options={periodOptions}
        />

        <Select
          name="sala"
          label="Sala"
          value={classroom}
          onChange={e => handleChangeClassroom(e.target.value)}
          options={roomOptions}
        />

        <Input
          name="professor"
          label="Professor"
          value={teacher}
          onChange={e => handleChangeTeacher(e.target.value)}
        />

        <input
          type="submit"
          className="botao"
          disabled={[grade, group, period, classroom].includes('')}
          value={idClassEdit === 0 ? 'Cadastrar' : 'Salvar'}
        />
      </form>
    </div>
  );
};
