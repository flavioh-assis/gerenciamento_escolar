import { Request, Response } from 'express'
import db from '../database/connection'

export default class AlunosController {
  async index(req: Request, res: Response) {
    const filters = req.query

    if (!filters.nome) {
      var nome = '%'
    } else {
      var nome = filters.nome as string
    }

    if (!filters.ra) {
      var ra = '%'
    } else {
      var ra = filters.ra as string
    }

    if (!filters.rm) {
      var rm = '%'
    } else {
      var rm = filters.rm as string
    }

    if (!filters.nee) {
      var nee = '%'
    } else {
      var nee = filters.nee as string
    }

    if (!filters.ano) {
      var ano = '%'
    } else {
      var ano = filters.ano as string
    }

    if (!filters.turma) {
      var turma = '%'
    } else {
      var turma = filters.turma as string
    }

    if (!filters.professor) {
      var professor = '%'
    } else {
      var professor = filters.professor as string
    }

    const alunos = await db('tbAlunos')
      .join('tbMatriculas', 'tbMatriculas.ra', '=', 'tbAlunos.ra')
      .join('tbClasses', 'tbClasses.id', '=', 'tbMatriculas.classe_id')

      .where('nome', 'ilike', `${nome}%`)
      .andWhere('tbAlunos.ra', 'like', `${ra}`)
      .andWhere('rm', 'like', `${rm}`)
      .andWhere('tbClasses.ano', 'ilike', `${ano}`)
      .andWhere('tbClasses.turma', 'ilike', `${turma}`)
      .andWhere('professor', 'ilike', `${professor}%`)
      .andWhere('nee', 'like', `${nee}`)

    return res.json(alunos)
  }

  async create(req: Request, res: Response) {
    const {
      nome,
      ra,
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
      
      data_inicio,
      data_fim,
      ano_letivo,
      ano,
      turma,
      situaçao,
      idade,
    } = req.body

    const trx = await db.transaction()

    try {
      const rm_gerado = await trx('tbRm')
        .insert({
          aluno: nome,
          data_nasc: nasc_data,
          mae,
        })
        .returning('rm')

      await trx('tbAlunos').insert({
        nome,
        ra,
        rm: String(rm_gerado[0]),
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
      })

      const sel_id_classe = trx('tbClasses')
        .where('ano', '=', `${ano}`)
        .andWhere('turma', '=', `${turma}`)
        .select('id')

      const id_classe = await trx('tbClasses')
        .increment('ativos', 1)
        .where('id', 'in', sel_id_classe)
        .returning('id')

      const n_chamada = await trx('tbClasses')
        .increment('total', 1)
        .where('id', 'in', sel_id_classe)
        .returning('total')

      await trx('tbMatriculas').insert({
        ra,
        data_inicio,
        data_fim,
        ano_letivo,
        classe_id: id_classe[0],
        situaçao,
        num_chamada: n_chamada[0],
        idade,
      })

      await trx.commit()

      return res.status(201).json({
        RM: rm_gerado[0],
        Total: n_chamada[0],
      })
    } catch (err) {
      await trx.rollback()

      return res.status(400).json({
        error: 'Deu ruim',
      })
    }
  }
}
