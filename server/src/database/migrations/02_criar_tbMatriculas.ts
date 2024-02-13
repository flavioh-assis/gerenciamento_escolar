import { Knex } from 'knex';
import { Table } from '../../enum/database';

export async function up(knex: Knex) {
  return knex.schema.hasTable(Table.ENROLLMENT).then(exists => {
    if (!exists) {
      return knex.schema
        .createTable(Table.ENROLLMENT, table => {
          table.increments('id').primary();
          table.integer('id_aluno').references('id').inTable(Table.STUDENT);
          table.string('data_inicio');
          table.string('data_fim');
          table.string('situacao');
          table.integer('num_chamada');
          table.integer('idade');
          table.integer('id_classe');
        })
        .options({ engine: 'innodb' });
    }
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(Table.ENROLLMENT);
}
