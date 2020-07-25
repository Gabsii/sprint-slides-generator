exports.up = function(knex) {
  return knex.schema.createTable('presentations', function(table) {
    table
      .increments('id')
      .unsigned()
      .primary();
    table
      .integer('sprint_id')
      .unsigned()
      .notNullable();
    table.json('highlights_impediments').notNullable();
    table.json('bugs');

    table.foreign('sprint_id').references('sprints.id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('presentations');
};
