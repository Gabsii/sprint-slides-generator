exports.up = function(knex) {
  return knex.schema.createTable('boards', function(table) {
    table
      .increments('id')
      .unsigned()
      .primary();
    table.string('jira_url', 255);
    table.string('name', 255).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('boards');
};
