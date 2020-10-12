import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('tbAlunos', table => {
    table.increments('id').primary()
    table.string('nome').notNullable()
    table.string('ra').notNullable()
    table.string('rm').nullable()
    table.string('nasc_cidade').notNullable()
    table.string('nasc_uf').notNullable()
    table.string('nacionalidade').notNullable()
    table.date('nasc_data').notNullable()
    table.string('cert_numero').notNullable()
    table.string('cert_livro').notNullable()
    table.string('cert_folha').notNullable()
    table.string('distrito').notNullable()
    table.string('comarca').notNullable()
    table.string('comarca_uf').notNullable()
    table.string('nee').nullable()
    table.string('pai').nullable()
    table.string('mae').nullable()
    table.string('resp_nome').nullable()
    table.date('resp_validade').nullable()
    table.string('endereço').notNullable()
    table.string('bairro').notNullable()
    table.string('cidade').notNullable()
    table.string('telefones').nullable()
    table.string('observaçoes').nullable()
    table.string('proc_escola').nullable()
    table.string('proc_cidade').nullable()
    table.string('proc_ano').nullable()
    table.boolean('ex_aluno').notNullable()
    table.string('ano_desejado').notNullable()
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('tbAlunos')
}
