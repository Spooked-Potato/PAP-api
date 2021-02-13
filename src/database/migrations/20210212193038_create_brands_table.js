exports.up = function (knex) {
  return knex.schema.createTable('Brand', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('image').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('Brand')
};