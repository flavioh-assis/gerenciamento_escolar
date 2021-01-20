import { Request, Response } from 'express'
import db from '../database/connection'

export default class ClassesController {
  async index(req: Request, res: Response) {   
    const currentYear = new Date().getFullYear()

    try {
      const classes = await db('tbClasses')
        .where('situaçao', '=', 'ATIVO')
        .andWhere('ano_letivo', '=', '2020')
        // .select('id', 'ano', 'turma', 'periodo', 'sala', 'professor')

      return res.json(classes)
      
    } catch (err) {
      return res.status(400).json({
        error: err,
      })
    }
  }
  async create(req: Request, res: Response) {
    const currentYear = new Date().getFullYear()

    const {
      ano,
      turma,
      periodo,
      sala,
      professor,
    } = req.body

    const trx = await db.transaction()

    try {
      const id = await trx('tbClasses')
        .insert({
          ano,
          turma,
          periodo,
          sala,
          professor,
          ativos: 0,
          total: 0,
          situaçao: 'ATIVO',
          // ano_letivo: String(currentYear),
          ano_letivo: '2020',
        })
        .returning('id')

      await trx.commit()

      return res.status(201).json({
        ID: Number(id),
      })
    } catch (err) {
      await trx.rollback()

      return res.status(400).json({
        error: err,
      })
    }
  }
}
