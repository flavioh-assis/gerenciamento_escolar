import { Request, Response } from 'express'
import db from '../database/connection'

export default class ClassesController {
  async index(req: Request, res: Response) {
    const currentYear = new Date().getFullYear()

    const classes = await db('tbClasses')
      .where('tbClasses.status', '=', 'ATIVO')
      .andWhere('tbClasses.ano_letivo', '=', currentYear)

    return res.json(classes)
  }
  async create(req: Request, res: Response) {
    const currentYear = new Date().getFullYear()
    
    const {
      ano,
      turma,
      periodo,
      sala,
      professor,
      status,
      ano_letivo
    } = req.body
  
    const trx = await db.transaction()
  
    try {
      await trx('tbClasses').insert({
        ano,
        turma,
        periodo,
        sala,
        professor,
        status: 'ATIVO',
        ano_letivo: currentYear
      })
  
      await trx.commit()
    
      return res.status(201).send()
  
    } catch (err) {
      await trx.rollback()
  
      return res.status(400).json({
        error: 'Erro ao cadastrar a classe'
      })
    }
  }
}