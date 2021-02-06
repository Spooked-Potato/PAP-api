
exports.up = function(knex) {
  return knex.schema.createTable('Users', function(table){
    table.increments('id').primary();
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.string('email').notNullable();
    table.string('gender').notNullable();
    table.boolean('admin').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('Users')
};
