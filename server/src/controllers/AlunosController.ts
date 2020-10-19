import { Request, Response } from 'express'
import db from '../database/connection'

export default class AlunosController {
  async index(req: Request, res: Response) {
    const alunos = await db('tbAlunos')
      .join('tbMatriculas', 'tbMatriculas.ra', '=', 'tbAlunos.ra')
      .join('tbRm', 'tbRm.rm', '=', 'tbAlunos.rm')
      .where('tbMatriculas.classe', 'ilike', '1º%')
      // `%${bookDescription[0]}%`

    return res.json(alunos)
  }

  async create(req: Request, res: Response) {
    const {
      nome,
      ra,
      // rm,
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
      // tbMatriculas ----------------------
      data_inicio,
      data_fim,
      ano_letivo,
      classe,
      status,
      num_chamada,
      idade,
    } = req.body

    let day = nasc_data.substr(0, 2)
    let month = nasc_data.substr(2, 2) - 1
    let year = nasc_data.substr(4, 4)
    const nasc_data_convert = new Date(year, month, day)

    let resp_validade_convert = null

    if (resp_validade != null) {
      day = resp_validade.substr(0, 2)
      month = resp_validade.substr(2, 2) - 1
      year = resp_validade.substr(4, 4)

      let resp_validade_convert = new Date(year, month, day)
    }

    // tbMatriculas --------------------------------
    day = data_inicio.substr(0, 2)
    month = data_inicio.substr(2, 2) - 1
    year = data_inicio.substr(4, 4)
    const data_inicio_convert = new Date(year, month, day)

    let data_fim_convert = null

    if (data_fim != null) {
      day = data_fim.substr(0, 2)
      month = data_fim.substr(2, 2) - 1
      year = data_fim.substr(4, 4)
      data_fim_convert = new Date(year, month, day)
    }
    // tbMatriculas --------------------------------

    const trx = await db.transaction()

    try {
      const rm_gerado = await trx('tbRm').insert({
        aluno: nome,
        ano_letivo,
        data_nasc: nasc_data_convert,
        mae,
      }).returning('rm')

      await trx('tbAlunos').insert({
        nome,
        ra,
        rm: rm_gerado[0],
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

      await trx('tbMatriculas').insert({
        ra,
        data_inicio: data_inicio_convert,
        data_fim: data_fim_convert,
        ano_letivo,
        classe,
        status,
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
