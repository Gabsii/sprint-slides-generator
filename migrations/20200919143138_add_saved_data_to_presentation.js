exports.up = function (knex) {
  return knex.schema.table('presentations', function (table) {
    table.text('stories', 'mediumtext');
    table.text('bugs', 'mediumtext');
    table.text('others', 'mediumtext');
    table.text('inReview', 'mediumtext');
    table.text('assignees', 'mediumtext');
    table.text('highlights_impediments', 'mediumtext');
    table.text('user', 'mediumtext');

    table.unique('sprint_id');
  });
};

exports.down = function (knex) {
  return knex.schema.table('presentations', function (table) {
    table.dropColumn('bugs');
    table.dropColumn('highlights_impediments');
    table.dropColumn('stories');
    table.dropColumn('others');
    table.dropColumn('inReview');
    table.dropColumn('assignees');
    table.dropColumn('user');
  });
};
