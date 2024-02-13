import { Knex } from 'knex';
import { Table } from '../../enum/database';

export async function up(knex: Knex) {
  return knex.schema.hasTable(Table.CLASS).then(exists => {
    if (!exists) {
      return knex.schema
        .createTable(Table.CLASS, table => {
          table.increments('id').primary();
          table.string('ano');
          table.string('turma');
          table.string('periodo');
          table.string('sala');
          table.string('professor');
          table.integer('n_ativos');
          table.integer('n_total');
          table.string('ano_letivo');
        })
        .options({ engine: 'innodb' });
    }
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(Table.CLASS);
}
