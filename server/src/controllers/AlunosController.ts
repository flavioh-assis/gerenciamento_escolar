import { Request, Response } from 'express'
import db from '../database/connection'

export default class AlunosController {
  async index(req: Request, res: Response) {
    const alunos = await db('tbAlunos')

    return res.json(alunos)
  }

  async create(req: Request, res: Response) {
    const {
      nome,
      ra,
      rm,
      nasc_cidade,
      nasc_uf,
      nacionalidade,
      nasc_data,
      cert_numero,
      cert_livro,
      cert_folha,
      distrito,
      comarca,
      comarca_uf,
      nee,
      pai,
      mae,
      resp_nome,
      resp_validade,
      endereço,
      bairro,
      cidade,
      telefones,
      observaçoes,
      proc_escola,
      proc_cidade,
      proc_ano,
      ex_aluno,
      ano_desejado,
    } = req.body

    const day = nasc_data.substr(0, 2)
    const month = nasc_data.substr(2, 2) - 1
    const year = nasc_data.substr(4, 4)
    const nasc_data_convert = new Date(year, month, day)

    let resp_validade_convert = null

    if (resp_validade != null) {
      const day = resp_validade.substr(0, 2)
      const month = resp_validade.substr(2, 2) - 1
      const year = resp_validade.substr(4, 4)

      resp_validade_convert = new Date(year, month, day)
    }

    const trx = await db.transaction()

    try {
      await trx('tbAlunos').insert({
        nome,
        ra,
        rm,
        nasc_cidade,
        nasc_uf,
        nacionalidade,
        nasc_data: nasc_data_convert,
        cert_numero,
        cert_livro,
        cert_folha,
        distrito,
        comarca,
        comarca_uf,
        nee,
        pai,
        mae,
        resp_nome,
        resp_validade: resp_validade_convert,
        endereço,
        bairro,
        cidade,
        telefones,
        observaçoes,
        proc_escola,
        proc_cidade,
        proc_ano,
        ex_aluno,
        ano_desejado,
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
