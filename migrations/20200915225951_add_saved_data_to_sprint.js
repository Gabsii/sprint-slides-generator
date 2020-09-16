exports.up = function(knex) {
  return knex.schema.table('sprints', function(table) {
    table
      .boolean('isSaved')
      .notNullable()
      .defaultTo(false);
    table.text('data', 'mediumtext');
  });
};

exports.down = function(knex) {
  return knex.schema.table('sprints', function(table) {
    table.boolean('isSaved').notNullable();
    table.boolean('data').notNullable();
  });
};
