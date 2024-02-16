import { Request, Response } from 'express';
import { Table } from '../enum/database';
import db from '../database/connection';

type FetchResult = {
  [key: string]: string;
}[];

type ResultGrades = {
  ano: string;
}[];

const Options = {
  CLASSROOMS: ['01', '02', '03', '04', '05', '06', '07', '08', '09'],
  GRADES: ['1º', '2º', '3º', '4º', '5º'],
  GROUPS: ['A', 'B', 'C', 'D'],
};

async function getAvailableGroups(grade: string) {
  const field = 'turma';
  const resultGroups: FetchResult = await db(Table.CLASS).select(field).where('ano', grade);

  return await getAvailableItems(field, resultGroups, Options.GROUPS);
}

async function getAvailableClassrooms(period: string) {
  const field = 'sala';
  const resultClassrooms: FetchResult = await db(Table.CLASS).select(field).where('periodo', period);

  return await getAvailableItems(field, resultClassrooms, Options.CLASSROOMS);
}

async function getAvailableItems(field: string, fetchResult: FetchResult, options: string[]): Promise<string[]> {
  return options.reduce((availableItems: string[], item: string) => {
    const itemExistsInDatabase = Boolean(fetchResult.find(x => x[field] === item));

    if (!itemExistsInDatabase) {
      availableItems.push(item);
    }

    return availableItems;
  }, []);
}

export default class ClassesController {
  async index({ query }: Request, res: Response) {
    const schoolYear = query.schoolYear || new Date().getFullYear();

    try {
      const classes = await db(Table.CLASS).where('ano_letivo', schoolYear).orderBy('ano').orderBy('turma');

      console.log(`-> ${classes.length} Class(es) selected`);

      return res.json(classes);
    } catch (error) {
      return res.status(500).json({
        error: 'Something went wrong. It was not possible to retrieve the data.',
      });
    }
  }

  async create({ body }: Request, res: Response) {
    const schoolYear = body.schoolYear || new Date().getFullYear();

    const { ano, turma, periodo, sala, professor } = body;

    const trx = await db.transaction();

    try {
      const result = await trx(Table.CLASS)
        .insert({
          ano,
          turma,
          periodo,
          sala,
          professor,
          n_ativos: 0,
          n_total: 0,
          ano_letivo: schoolYear,
        })
        .returning('*');

      await trx.commit();

      const newClass = result[0];

      console.log(`-> Class created with id ${newClass.id}`);

      return res.status(201).json(newClass);
    } catch (error) {
      await trx.rollback();

      console.log(`-> Error to create the Class. ${error}`);

      return res.status(500).json({
        error: 'Something went wrong. It was not possible to create the Class.',
      });
    }
  }

  async delete({ params }: Request, res: Response) {
    const { id } = params;

    const trx = await db.transaction();

    try {
      await trx(Table.CLASS)
        .where('id', id)
        .del()
        .then(() => {
          trx.commit();
        });

      console.log(`-> Class with id ${id} deleted`);

      return res.status(204).send();
    } catch (error) {
      await trx.rollback();
      console.log(error);

      return res.status(500).json({
        error: 'Something went wrong. It was not possible to delete the Class.',
      });
    }
  }

  async update({ body, params }: Request, res: Response) {
    const { id } = params;
    const { ano, turma, periodo, sala, professor } = body;

    const trx = await db.transaction();

    try {
      await trx(Table.CLASS)
        .update({
          ano,
          turma,
          periodo,
          sala,
          professor,
        })
        .where('id', id)
        .then(() => {
          trx.commit();
        });

      console.log(`-> Class with id ${id} updated`);

      return res.status(204).send();
    } catch (error) {
      await trx.rollback();

      console.log(`-> Error to update the Class with id. ${error}`);

      return res.status(500).json({
        error: 'Something went wrong. It was not possible to update the Class data.',
      });
    }
  }

  async available({ query }: Request, res: Response) {
    const { ano, periodo } = query;

    if (ano) {
      const availableGroups = await getAvailableGroups(ano as string);

      console.log(`-> Available groups:`, availableGroups);

      return res.json(availableGroups);
    }

    if (periodo) {
      const availableRooms = await getAvailableClassrooms(periodo as string);

      console.log(`-> Available classrooms:`, availableRooms);

      return res.json(availableRooms);
    }

    const resultGrades: ResultGrades = await db(Table.CLASS).select('ano');

    const availableGrades = Options.GRADES.reduce((available: string[], grade: string) => {
      const gradeCountInDatabase = resultGrades.filter(x => x.ano === grade).length;

      if (gradeCountInDatabase < Options.GROUPS.length) {
        available.push(grade);
      }

      return available;
    }, []);

    console.log(`-> Available grades:`, availableGrades);

    return res.json(availableGrades);
  }
}
