import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('list', (table) => {
      table.increments();
      table.text('name').notNullable();
    })
    .createTable('task', (table) => {
      table.increments();
      table.text('text').notNullable();
      table
        .integer('list_id')
        .unsigned()
        .references('id')
        .inTable('list')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('task').dropTableIfExists('list');
}
