import { Request, Response } from 'express'
import db from '../database/connection'

export default class AlunosController {
  async index(req: Request, res: Response) {
    const filters = req.query

    let nome = filters.nome as string
    let ra = filters.ra as string
    let rm = filters.rm as string
    let nee = filters.nee as string
    let ano = filters.ano as string
    let turma = filters.turma as string
    let professor = filters.professor as string

    if (nome == null) {
      nome = '%'
    }
    if (ra == null) {
      ra = '%'
    }
    if (rm == null) {
      rm = '%'
    }
    if (nee == null) {
      nee = '%'
    }
    if (ano == null) {
      ano = '%'
    }
    if (turma == null) {
      turma = '%'
    }
    if (professor == null) {
      professor = '%'
    }
    // if (
    //   !filters.nome ||
    //   !filters.ra ||
    //   !filters.rm ||
    //   !filters.nee ||
    //   !filters.ano ||
    //   !filters.turma ||
    //   !filters.professor
    // ) {
    //   return res.status(400).json({
    //     error: 'Sem filtro para a pesquisa.',
    //   })
    // }

    // let alunos = {}

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

      // .select('nome as Nome Completo', 'ano as Ano', 'turma as Turma')

      .select('nome', 'ano', 'turma', 'tbAlunos.ra', 'rm', 'nee', 'professor')
    // .where('nome', 'ilike', `${nome}%`)
    // .where('ano', '=', `${ano}`)
    // .where('turma', '=', `${turma}`)

    // .select('nome as Nome Completo')

    /*

    if (nome != null) {
      alunos = await db('tbAlunos')
        .join('tbMatriculas', 'tbMatriculas.ra', '=', 'tbAlunos.ra')
        .join('tbClasses', 'tbClasses.id', '=', 'tbMatriculas.classe')
        .where('nome', 'ilike', `${nome}%`)
        .select(['nome as Nome Completo', 'ano as Ano', 'turma as Turma', 'tbAlunos.ra as RA', 'rm as RM'])
        // .select('nome as Nome Completo')
    }

    if (ra != null) {
      alunos = await db('tbAlunos')
        .join('tbMatriculas', 'tbMatriculas.ra', '=', 'tbAlunos.ra')
        .join('tbClasses', 'tbClasses.id', '=', 'tbMatriculas.classe')
        .where('tbMatriculas.ra', '=', `${ra}`)
        .select(['nome as Nome Completo', 'ano as Ano', 'turma as Turma', 'tbAlunos.ra as RA', 'rm as RM'])
    }

    if (rm != null) {
      alunos = await db('tbAlunos')
        .join('tbMatriculas', 'tbMatriculas.ra', '=', 'tbAlunos.ra')
        .join('tbClasses', 'tbClasses.id', '=', 'tbMatriculas.classe')
        .where('rm', '=', Number(`${rm}`))
        .select(['nome as Nome Completo', 'ano as Ano', 'turma as Turma', 'tbAlunos.ra as RA', 'rm as RM'])
    }

    if (nee != null) {
      alunos = await db('tbAlunos')
        .join('tbMatriculas', 'tbMatriculas.ra', '=', 'tbAlunos.ra')
        .join('tbClasses', 'tbClasses.id', '=', 'tbMatriculas.classe')
        .where('nee', '=', `${nee}`)
        .select(['nome as Nome Completo', 'ano as Ano', 'turma as Turma', 'tbAlunos.ra as RA', 'rm as RM'])
    }

    if (ano != null) {
      alunos = await db('tbAlunos')
        .join('tbMatriculas', 'tbMatriculas.ra', '=', 'tbAlunos.ra')
        .join('tbClasses', 'tbClasses.id', '=', 'tbMatriculas.classe')
        .where('ano', '=', `${ano}`)
        .select(['nome as Nome Completo', 'ano as Ano', 'turma as Turma', 'tbAlunos.ra as RA', 'rm as RM'])
    }

    if (turma != null) {
      alunos = await db('tbAlunos')
        .join('tbMatriculas', 'tbMatriculas.ra', '=', 'tbAlunos.ra')
        .join('tbClasses', 'tbClasses.id', '=', 'tbMatriculas.classe')
        .where('turma', '=', `${turma}`)
        .select(['nome as Nome Completo', 'ano as Ano', 'turma as Turma', 'tbAlunos.ra as RA', 'rm as RM'])
    }

    if (professor != null) {
      alunos = await db('tbAlunos')
        .join('tbMatriculas', 'tbMatriculas.ra', '=', 'tbAlunos.ra')
        .join('tbClasses', 'tbClasses.id', '=', 'tbMatriculas.classe')
        .where('professor', 'ilike', `${professor}`)
        .select(['nome as Nome Completo', 'ano as Ano', 'turma as Turma', 'tbAlunos.ra as RA', 'rm as RM'])
    }

*/

    // const alunos = await db('tbAlunos')
    // .join('tbMatriculas', 'tbMatriculas.ra', '=', 'tbAlunos.ra')
    // .where('nome', 'ilike', `${nome}%`)
    // .where('tbMatriculas.ra', '=', `${ra}`)
    // .where('rm', '=', Number(`${rm}`))
    // .where('nee', '=', `${nee}%`)
    // .where('ano', '=', `${ano}%`)
    // .where('turma', '=', `${turma}%`)
    // .where('professor', 'ilike', `${professor}%`)

    // .select(['tbAlunos.nome as Nome Completo'])
    // .select(['*'])

    // .select(['tbAlunos.id as id_aluno' , 'tbMatriculas.id as id_mat', 'nome'])

    // .whereExists(function () {
    //     this.select('class_schedule.*')
    //       .from('class_schedule')
    //       .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
    //       .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
    //       .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
    //       .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
    //   })
    //   .where('classes.subject', '=', subject)
    //   .join('users', 'classes.user_id', '=', 'users.id')
    //   .select(['classes.*', 'users.*'])

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
      // tbMatriculas ----------------------
      data_inicio,
      data_fim,
      ano_letivo,
      classe,
      situaçao,
      num_chamada,
      idade,
    } = req.body
    /*
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
    */

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

      await trx('tbMatriculas').insert({
        ra,
        data_inicio,
        data_fim,
        ano_letivo,
        classe_id: classe,
        situaçao,
        num_chamada,
        idade,
      })

      await trx.commit()

      return res.status(201).json({
        RM: rm_gerado[0],
      })
    } catch (err) {
      await trx.rollback()

      return res.status(400).json({
        error: 'Deu ruim',
      })
    }
  }
}
