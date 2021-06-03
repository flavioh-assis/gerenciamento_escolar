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
        error: err
      })
    }
  }
}
