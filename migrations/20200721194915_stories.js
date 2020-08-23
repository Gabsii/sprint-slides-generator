exports.up = function(knex) {
  return knex.schema.createTable('stories', function(table) {
    table
      .increments('id')
      .unsigned()
      .primary();
    table.string('name', 255).notNullable();
    table.string('key', 255).notNullable();
    table.string('jira_url', 255).notNullable();
    table.float('estimation').defaultTo(0);
    table.integer('assignee_id').unsigned();
    table.text('description');
    table.string('stage', 255);

    table.foreign('assignee_id').references('users.id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('stories');
};
