const slugify = require('slugify');

// S/O to this StackOverflow post for Multiple Updates
// https://stackoverflow.com/a/48069213/7287584

exports.seed = function(knex) {
  return knex.transaction(trx =>
    trx('sprints').then(function(res) {
      let queries = [];
      res.forEach(function(sprint) {
        const slug = slugify(sprint.name, {
          lower: true,
          locale: 'de',
          remove: /[*+~.()'"!:@]/g,
        });

        queries.push(
          knex('sprints')
            .where({ id: sprint.id })
            .update({ slug })
            .transacting(trx),
        );
      });

      return Promise.all(queries)
        .then(trx.commit)
        .catch(trx.rollback);
    }),
  );
};
