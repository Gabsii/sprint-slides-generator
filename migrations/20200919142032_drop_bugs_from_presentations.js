exports.up = function (knex) {
  return knex.schema.table('presentations', function (table) {
    table.dropColumn('bugs');
    table.dropColumn('highlights_impediments');
  });
};

exports.down = function (knex) {
  return knex.schema.table('presentations', function (table) {
    table.json('highlights_impediments').notNullable();
    table.json('bugs');
  });
};
