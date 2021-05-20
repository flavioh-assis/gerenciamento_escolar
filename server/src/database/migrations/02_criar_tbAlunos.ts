import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('tbAlunos', (table) => {
    table.increments('id').primary()
    table.string('nome')
    table.string('ra')
    table.integer('id_rm').references('id').inTable('tbRm')
    table.string('nasc_cidade')
    table.string('nasc_uf')
    table.string('nacionalidade')
    table.string('nasc_data')
    table.string('nee')
    table.string('pai')
    table.string('mae')
    table.string('responsavel')
    table.string('endereco')
    table.string('bairro')
    table.string('cidade')
    table.string('telefones')
    table.string('obs')
    table.string('proc_escola')
    table.string('proc_cidade')
    table.string('proc_ano')
    table.string('ex_aluno')
    table.string('ano_desejado')
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('tbAlunos')
}
