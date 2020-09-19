exports.up = function (knex) {
  return knex.seed.run().then(() =>
    knex.schema.table('sprints', function (table) {
      table.dropColumn('data');
    }),
  );
};

exports.down = function (knex) {
  return knex.schema.table('sprints', function (table) {
    table.text('data', 'mediumtext');
  });
};
