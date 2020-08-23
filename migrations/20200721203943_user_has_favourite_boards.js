exports.up = function(knex) {
  return knex.schema.createTable('user_has_favourite_boards', function(table) {
    table.integer('user_id').unsigned();
    table.integer('board_id').unsigned();

    table.foreign('user_id').references('users.id');
    table.foreign('board_id').references('boards.id');
    table.unique(['user_id', 'board_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('user_has_favourite_boards');
};
