import { Request, Response } from 'express'
import db from '../database/connection'

export default class ClassesController {
  async index(req: Request, res: Response) {
    const currentYear = new Date().getFullYear()

    try {
      const classes = await db('tbClasses')
        .where('ano_letivo', '=', currentYear)
        .orderBy('ano')
        .orderBy('turma')

      console.log('selected')

      return res.json(classes)
    } catch (err) {
      return res.status(400).json({
        error: err,
      })
    }
  }

  async create(req: Request, res: Response) {
    const currentYear = new Date().getFullYear()

    const { ano, turma, periodo, sala, professor } = req.body

    const trx = await db.transaction()

    try {
      await trx('tbClasses')
        .insert({
          ano,
          turma,
          periodo,
          sala,
          professor,
          n_ativos: 0,
          n_total: 0,
          ano_letivo: currentYear,
        })
        .returning('id')

      await trx.commit()

      console.log('created')

      return res.status(201).json({})
    } catch (err) {
      await trx.rollback()
      console.log(err)

      return res.status(400).json({
        error: err,
      })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.body

    const trx = await db.transaction()

    try {
      await trx('tbClasses')
        .where('id', id)
        .del()
        .then(() => {
          trx.commit()
        })

      return res.status(201)
    } catch (error) {
      await trx.rollback()
      console.log(error)

      return res.status(400)
    }
  }

  async update(req: Request, res: Response) {
    const { id, ano, turma, periodo, sala, professor } = req.body

    const trx = await db.transaction()

    try {
      await trx('tbClasses')
        .update({
          ano,
          turma,
          periodo,
          sala,
          professor,
        })
        .where('id', id)

      await trx.commit()

      console.log('updated')

      return res.status(201).json({})
    } catch (err) {
      await trx.rollback()
      console.log(err)

      return res.status(400).json({
        error: err,
      })
    }
  }

  async disp(req: Request, res: Response) {
    const { ano, periodo } = req.query

    let disp = new Array()

    if (ano) {
      console.log('TURMA');
      
      const turmas = ['A', 'B', 'C', 'D']

      turmas.forEach(async (turma) => {
        await db('tbClasses')
          .where('ano', ano as string)
          .andWhere('turma', turma)
          .count('turma')
          .then((res) => {
            const countAno = res[0]['count'] as Number

            if (countAno == 0) {
              disp.push(turma)
            }
          })
        if (turma == 'D') {
          console.log(disp)

          return res.json(disp)
        }
      })
    } else if (periodo) {
      console.log('SALA');
      
      const salas = ['01', '02', '03', '04', '05', '06', '07', '08', '09']

      salas.forEach(async (sala) => {
        await db('tbClasses')
          .where('periodo', periodo as string)
          .andWhere('sala', sala)
          .count('sala')
          .then((res) => {
            const count = res[0]['count'] as Number

            if (count == 0) {
              disp.push(sala)
            }
          })
        if (sala == '09') {
          console.log(disp)

          return res.json(disp)
        }
      })
    } else {
      const anos = ['1º', '2º', '3º', '4º', '5º']
      let sel = new Array()

      anos.forEach(async (ano) => {
        await db('tbClasses')
          .where('ano', ano)
          .count('turma')
          .then((res) => {
            const countAno = res[0]['count'] as Number

            if (countAno > 0) {
              sel.push(ano)
            }

            if (countAno < 4) {
              disp.push(ano)
            }
          })
        if (ano == '5º') {
          return res.json({
            sel: sel,
            disp: disp,
          })
        }
      })
    }
  }
}
