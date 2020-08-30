exports.up = function(knex) {
  return knex.schema.table('sprints', function(table) {
    table.string('slug').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.table('sprints', function(table) {
    table.dropColumn('slug');
  });
};
