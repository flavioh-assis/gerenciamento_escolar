import React, { FormEvent, useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import Cabeçalho from '../../components/Cabeçalho';
import { ClassSelection } from '../../components/SelecaoClasses';
import { DadosClasseSelecionada } from '../../components/DadosClasseSelecionada';
import { Class, Fields, Period } from '../../types';
import { api } from '../../services/api';
import './styles.css';

export const getClasses = async () => {
  const { data: classes } = await api.get('/classes').catch(() => ({
    data: [],
  }));

  return classes as any[];
};

export default () => {
  const initialValue: Fields = {
    grade: '',
    group: '',
    period: '',
    classroom: '',
    teacher: '',
  };
  const [fields, setFields] = useState<Fields>(initialValue);
  const [idClassEdit, setIdClassEdit] = useState<number>(0);

  const [availableGrades, setAvailableGrades] = useState<string[]>([]);
  const [availableGroups, setAvailableGroups] = useState<string[]>([]);
  const [availableRooms, setAvailableRooms] = useState<string[]>([]);
  const availablePeriods: Period[] = ['Manhã', 'Tarde'];

  const [classes, setClasses] = useState<any[]>([]);

  const getAvailableGrades = async () => {
    const { data: grades } = await api.get('/classes/available').catch(() => ({
      data: [],
    }));

    return grades as string[];
  };

  const getAvailableGroups = async (grade: string) => {
    const { data: groups } = await api.get(`/classes/available?ano=${grade}`).catch(() => ({
      data: [],
    }));

    return groups as string[];
  };

  const getAvailableRooms = async (period: string) => {
    const { data: rooms } = await api.get(`/classes/available?periodo=${period}`).catch(() => ({
      data: [],
    }));

    return rooms as string[];
  };

  const updateAvailableGrades = async () => {
    const available = await getAvailableGrades();

    setAvailableGrades(available);
  };

  const updateAvailableGroups = async (grade: string) => {
    const available = await getAvailableGroups(grade);

    setAvailableGroups(available);
  };

  const updateAvailableRooms = async (period: string) => {
    const available = await getAvailableRooms(period);

    setAvailableRooms(available);
  };

  const updateClasses = async () => {
    const classes = await getClasses();

    setClasses(classes);
  };

  const handleChangeClassroom = (classroom: string) => {
    setFields(prevState => ({
      ...prevState,
      classroom,
    }));
  };

  const handleChangeGrade = (grade: string) => {
    setFields(prevState => ({
      ...prevState,
      grade,
    }));

    updateAvailableGroups(grade);
    handleChangeGroup('');
  };

  const handleChangeGroup = (group: string) => {
    setFields(prevState => ({
      ...prevState,
      group,
    }));
  };

  const handleChangePeriod = (period: string) => {
    if (['Manhã', 'Tarde'].includes(period)) {
      setFields(prevState => ({
        ...prevState,
        period: period as 'Manhã' | 'Tarde',
      }));

      updateAvailableRooms(period);
      handleChangeClassroom('');
    }
  };

  const handleChangeTeacher = (teacher: string) => {
    setFields(prevState => ({
      ...prevState,
      teacher,
    }));
  };

  const handleDelete = (id: number) => {
    id > 0 && deleteClass(id);
  };

  const handleEdit = async ({ id, ano, turma, periodo, sala, professor }: any) => {
    const editGradeIsAvailable = availableGrades.find(x => x === ano);

    if (!editGradeIsAvailable) {
      setAvailableGrades(prevState => [...prevState, ano].sort());
    }

    const availableGroupsUpdated = await getAvailableGroups(ano);
    console.log('availableGroupsUpdated', availableGroupsUpdated);

    const editGroupIsAvailable = availableGroupsUpdated.find(x => x === turma);

    if (!editGroupIsAvailable) {
      console.log('ñ tem turma', [...availableGroupsUpdated, turma].sort());

      setAvailableGroups([...availableGroupsUpdated, turma].sort());
    }

    const availableRoomsUpdated = await getAvailableRooms(periodo);
    const editRoomIsAvailable = availableRoomsUpdated.find(x => x === sala);

    if (!editRoomIsAvailable) {
      console.log('ñ tem sala', [...availableRoomsUpdated, sala].sort());

      setAvailableRooms([...availableRoomsUpdated, sala].sort());
    }

    setIdClassEdit(id);
    setFields({ grade: ano, group: turma, period: periodo, classroom: sala, teacher: professor });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if ([fields.grade, fields.group, fields.period, fields.classroom].includes('')) return;

    console.log('handleSubmit', [fields.grade, fields.group, fields.period, fields.classroom]);

    idClassEdit === 0 ? createClass(fields) : saveClass({ id: idClassEdit, ...fields });
  };

  const createClass = async ({ classroom, grade, group, period, teacher }: Fields) => {
    const { data: addedClass } = await api
      .post('classes', {
        ano: grade,
        turma: group,
        periodo: period,
        sala: classroom,
        professor: teacher,
      })
      .catch(() => {
        alert('Erro ao adicionar a classe.');
        return { data: undefined };
      });

    if (!addedClass) return;

    getClasses();
    cleanFields();
  };

  const saveClass = async ({ classroom, grade, group, id, period, teacher }: Class) => {
    await api
      .put(`/classes/${id}`, {
        id: id,
        ano: grade,
        turma: group,
        periodo: period,
        sala: classroom,
        professor: teacher,
      })
      .then(() => {
        cleanFields();
        updateAvailableGrades();
        updateClasses();
      })
      .catch(() => alert('Erro ao alterar dados da classe.'));
  };

  const deleteClass = async (id: number) => {
    await api
      .delete(`/classes/${id}`)
      .catch(() => alert('ERRO! Não foi possível excluir a Classe.'));

    updateClasses();
  };

  const cleanFields = () => {
    setFields(initialValue);
    setIdClassEdit(0);
  };

  useEffect(() => {
    updateClasses();
    updateAvailableGrades();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <Cabeçalho titulo="Gerenciar Classes" endereço="Classe > Gerenciar" />

      <div className="menu-conteudo">
        <Menu />

        <div className="conteudo">
          <ClassSelection
            grade={fields.grade}
            group={fields.group}
            period={fields.period}
            classroom={fields.classroom}
            teacher={fields.teacher}
            availableGrades={availableGrades}
            availableGroups={availableGroups}
            availableRooms={availableRooms}
            availablePeriods={availablePeriods}
            idClassEdit={idClassEdit}
            handleChangeClassroom={handleChangeClassroom}
            handleChangeGrade={handleChangeGrade}
            handleChangeGroup={handleChangeGroup}
            handleChangePeriod={handleChangePeriod}
            handleChangeTeacher={handleChangeTeacher}
            handleSubmit={handleSubmit}
          />

          <DadosClasseSelecionada
            classes={classes}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
};
