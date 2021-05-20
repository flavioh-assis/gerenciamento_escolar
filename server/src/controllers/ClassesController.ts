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
          n_ativos: 0,
          n_total: 0,
          ano_letivo: currentYear,
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

//   async delete(req: Request, res: Response) {
//     const id = req.body

//     const trx = await db.transaction()

//     try {
//       await trx('tbClasses')
//       .delete()
//     }
//   }

}
