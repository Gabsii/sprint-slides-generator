exports.up = function(knex) {
  return knex.schema.createTable('sprints', function(table) {
    table
      .increments('id')
      .unsigned()
      .primary();
    table.string('name', 255).notNullable();
    table.string('boardId', 255).notNullable();
    table.date('startDate').notNullable();
    table.date('endDate').notNullable();
    table.float('forecast');
    table.float('achievement');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('sprints');
};
