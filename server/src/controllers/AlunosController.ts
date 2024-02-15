import { Request, Response } from 'express';
import db from '../database/connection';
import { Table } from '../enum/database';
import { Student } from '../type/student';

function getFilterValues(req: Request) {
  const { ano, bairro, nee, nome, professor, ra, turma } = req.query;

  const values = {
    name: (nome as string) || '',
    studentRegistration: (ra as string) || '%',
    disability: (nee as string) == 'Qualquer' ? '%a' : (nee as string) || '',
    grade: (ano as string) || '%',
    group: (turma as string) || '%',
    teacher: (professor as string) || '',
    neighborhood: (bairro as string) || '',
  };

  console.log('-> Filter values:', values);

  return values;
}

export default class AlunosController {
  async index(req: Request, res: Response) {
    console.log('-> STUDENTS - GET BY FILTER - QUERY:', req.query);

    try {
      const { disability, grade, group, name, neighborhood, studentRegistration, teacher } = getFilterValues(req);

      const alunos = await db(Table.STUDENT)
        .join(Table.ENROLLMENT, `${Table.ENROLLMENT}.id_aluno`, '=', `${Table.STUDENT}.id`)
        .join(Table.CLASS, `${Table.CLASS}.id`, '=', `${Table.ENROLLMENT}.id_classe`)

        .where('nome', 'ilike', `${name}%`)
        .andWhere('ra', 'like', `${studentRegistration}`)
        .andWhere('nee', 'ilike', `${disability}%`)
        .andWhere('ano', 'like', `${grade}`)
        .andWhere('turma', 'like', `${group}`)
        .andWhere('professor', 'ilike', `${teacher}%`)
        .andWhere('bairro', 'ilike', `%${neighborhood}%`)
        .select(
          'tbAlunos.id as id',
          'num_chamada',
          'nome',
          'ra',
          'nee',
          'nasc_data',
          'ano',
          'turma',
          'professor',
          'situacao',
          'bairro',
        );

      console.log(`-> ${alunos.length} Students selected`);

      return res.json(alunos);
    } catch (error) {
      res.status(500).json({
        error: 'Something went wrong. It was not possible to retrieve the data.',
      });
    }
  }

  async create({ body }: Request, res: Response) {
    console.log('-> STUDENTS - POST CREATE - BODY:', body);

    const trx = await db.transaction();

    try {
      const { turma: group, rm, ...studentData } = body;
      const student: Student = { ...studentData };

      const today = new Date().toLocaleString('pt-br', {
        dateStyle: 'short',
      });

      const yearNasc = Number(student.nasc_data.slice(6));

      const resultIdClass = await db(Table.CLASS)
        .where('ano', '=', `${student.ano_desejado}`)
        .andWhere('turma', '=', `${group}`)
        .select('id');

      if (!resultIdClass.length) {
        throw new Error(`Class ${student.ano_desejado} ${group} doesn't exists.`);
      }
      const idClass = resultIdClass[0]['id'] as number;

      const resultIdStudent = await trx(Table.STUDENT).insert(student).returning('id');
      const idStudent = resultIdStudent[0]['id'] as number;

      const resultNumChamada = await trx(Table.CLASS)
        .increment('n_ativos', 1)
        .increment('n_total', 1)
        .where('id', '=', idClass)
        .returning('n_total');
      const n_chamada = resultNumChamada[0]['n_total'] as number;

      await trx(Table.ENROLLMENT).insert({
        id_aluno: idStudent,
        data_inicio: today,
        data_fim: null,
        situacao: 'ATIVO',
        num_chamada: n_chamada,
        idade: new Date().getFullYear() - yearNasc,
        id_classe: idClass,
      });

      await trx.commit();

      console.log(`-> Student created with id ${idStudent}`);

      return res.status(201).json({
        rm: idStudent,
      });
    } catch (error) {
      await trx.rollback();

      console.log(`-> Error: Student not created. ${error}`);

      return res.status(500).json({
        error: 'Something went wrong. It was not possible to create the Student.',
      });
    }
  }

  async rm(_: Request, res: Response) {
    console.log('-> STUDENTS - GET AVAILABLE ENROLLMENT REGISTRATION');

    try {
      const result = await db(Table.STUDENT).max('id').limit(1);

      const lastEnrollmentRegistration = (result[0]['max'] as number) || 0;
      const availableEnrollmentRegistration = lastEnrollmentRegistration + 1;

      console.log('-> Available Enrollment Registration:', availableEnrollmentRegistration);

      return res.json(availableEnrollmentRegistration);
    } catch (error) {
      console.log(`-> Error: Student not created. ${error}`);

      return res.status(500).json({
        error: 'Something went wrong. It was not possible to get the available Enrollment Registration.',
      });
    }
  }

  async id({ params }: Request, res: Response) {
    const { id } = params;
    console.log('-> STUDENTS - GET BY ID - PARAMS:', params);

    try {
      const student: Student[] = await db(Table.STUDENT)
        .join(`${Table.ENROLLMENT}`, `${Table.ENROLLMENT}.id_aluno`, `${Table.STUDENT}.id`)
        .join(`${Table.CLASS}`, `${Table.CLASS}.id`, `${Table.ENROLLMENT}.id_classe`)

        .where(`${Table.STUDENT}.id`, `${id}`)
        .select('*');

      if (student.length == 0) {
        console.log('-> Error: Student not found');

        return res.status(404).json({
          error: 'Student not found.',
        });
      }

      console.log('-> OK: Student selected by id', student[0]);

      return res.json(student[0]);
    } catch (error) {
      console.log(`-> Error: Student not found. ${error}`);

      return res.status(500).json({
        error: 'Something went wrong. It was not possible to search for the Student.',
      });
    }
  }
}
