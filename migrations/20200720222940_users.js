exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table
      .increments('id')
      .unsigned()
      .primary();
    table.string('name', 255).notNullable();
    table.string('full_name', 255).notNullable();
    table.string('avatar', 255).notNullable();
    table.string('email', 255).notNullable();

    table.unique('email');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
