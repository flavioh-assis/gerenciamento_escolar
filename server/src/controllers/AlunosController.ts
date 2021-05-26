import { Request, Response } from 'express'
import db from '../database/connection'
import moment from 'moment'

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

    if (!filters.nee) {
      var nee = '%'
    } else if (filters.nee == 'Qualquer') {
      var nee = '%a%'
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
      .join('tbMatriculas', 'tbMatriculas.id_aluno', '=', 'tbAlunos.id')
      .join('tbClasses', 'tbClasses.id', '=', 'tbMatriculas.id_classe')

      .where('nome', 'ilike', `${nome}%`)
      .andWhere('tbAlunos.ra', 'like', `${ra}`)
      .andWhere('nee', 'ilike', `${nee}`)
      .andWhere('ano', 'like', `${ano}`)
      .andWhere('turma', 'like', `${turma}`)
      .andWhere('professor', 'ilike', `${professor}%`)
      .select(
        'tbAlunos.id as id',
        'num_chamada',
        'nome',
        'ra',
        'nee',
        'nasc_data',
        'ano',
        'turma',
        'professor',
        'situacao'
      )

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
      nee,
      pai,
      mae,
      responsavel,
      endereco,
      bairro,
      cidade,
      telefones,
      obs,
      proc_escola,
      proc_cidade,
      proc_ano,
      ex_aluno,
      ano_desejado,
      turma,
    } = req.body

    const toDate = new Date()
    const today = moment(toDate).format('DD/MM/YYYY')

    const yearNasc = nasc_data.substr(6, 4)

    const trx = await db.transaction()

    try {
      const id_classe = trx('tbClasses')
        .where('ano', '=', `${ano_desejado}`)
        .andWhere('turma', '=', `${turma}`)
        .distinct('id')

      const id_aluno = await trx('tbAlunos')
        .insert({
          nome,
          ra,
          nasc_cidade,
          nasc_uf,
          nacionalidade,
          nasc_data,
          nee,
          pai,
          mae,
          responsavel,
          endereco,
          bairro,
          cidade,
          telefones,
          obs,
          proc_escola,
          proc_cidade,
          proc_ano,
          ex_aluno,
          ano_desejado,
        })
        .returning('id')

      const n_chamada = await trx('tbClasses')
        .increment('n_ativos', 1)
        .increment('n_total', 1)
        .where('id', '=', id_classe)
        .returning('n_total')

      await trx('tbMatriculas')
        .insert({
          id_aluno: id_aluno[0],
          data_inicio: today,
          data_fim: null,
          situacao: 'ATIVO',
          num_chamada: n_chamada[0],
          idade: (2021 - yearNasc) as Number,
          id_classe,
        })
        .returning('id')

      await trx.commit()

      return res.status(201).json({
        rm: id_aluno[0],
      })
    } catch (err) {
      await trx.rollback()
      console.log(err)

      return res.status(400).json({
        error: 'Erro ao matricular aluno.',
      })
    }
  }

  async rm(req: Request, res: Response) {
    try {
      const newRM = await db('tbAlunos').max('id')

      return res.json(newRM[0]['max'] + 1)

    } catch (error) {

      return res.status(400).json({
        error: 'Erro ao retornar um novo RM.'
      })
    }
  }
}
