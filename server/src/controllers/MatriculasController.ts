import { Request, Response } from 'express'
import db from '../database/connection'

export default class MatriculasController {
  async index(req: Request, res: Response) {
    const alunos = await db('tbMatriculas')

    return res.json(alunos)
  }

  async create(req: Request, res: Response) {
    const {
      ra,
      data_inicio,
      data_fim,
      ano_letivo,
      classe,
      situaçao,
      num_chamada,
      idade,
    } = req.body
/*
    const day = data_inicio.substr(0, 2)
    const month = data_inicio.substr(2, 2) - 1
    const year = data_inicio.substr(4, 4)
    const data_inicio_convert = new Date(year, month, day)

    let data_fim_convert = null
    
    if (data_fim != null) {
      const day = data_fim.substr(0, 2)
      const month = data_fim.substr(2, 2) - 1
      const year = data_fim.substr(4, 4)
      const data_fim_convert = new Date(year, month, day)
    }
*/
    const trx = await db.transaction()

    try {
      await trx('tbMatriculas').insert({
        ra,
        data_inicio,
        data_fim,
        ano_letivo,
        classe,
        situaçao,
        num_chamada,
        idade,
      })

      await trx.commit()

      return res.status(201).send()
    } catch (err) {
      await trx.rollback()

      return res.status(400).json({
        error: err,
      })
    }
  }
}
