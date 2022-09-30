import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('list', function (table) {
    table.unique(['name']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('list', function (table) {
    table.dropUnique(['name']);
  });
}
