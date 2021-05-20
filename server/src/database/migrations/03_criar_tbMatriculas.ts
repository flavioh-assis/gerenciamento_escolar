import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('tbMatriculas', table => {
    table.increments('id').primary()
    table.integer('id_aluno').references('id').inTable('tbAlunos')
    table.string('data_inicio')
    table.string('data_fim')
    table.string('situacao')
    table.integer('num_chamada')
    table.integer('idade')
    table.integer('id_classe')
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('tbMatriculas')
}
