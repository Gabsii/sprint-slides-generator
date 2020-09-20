exports.seed = function (knex) {
  return knex.transaction((trx) =>
    trx('sprints')
      .where('isSaved', true)
      .whereNot('data', null)
      .whereNot('data', '')
      .then(function (res) {
        let queries = [];
        const sprints = JSON.parse(JSON.stringify(res));

        sprints.forEach((sprint) => {
          const data = JSON.parse(sprint.data);
          queries.push(
            knex('presentations').insert({
              sprint_id: sprint.id,
              stories: JSON.stringify(data.tasks.stories) || null,
              bugs: JSON.stringify(data.tasks.bugs) || null,
              others: JSON.stringify(data.tasks.others) || null,
              inReview: JSON.stringify(data.tasks.inReview) || null,
              assignees: JSON.stringify(data.assignees) || null,
              highlights_impediments:
                (data.highlightsImpediments &&
                  JSON.stringify(data.highlightsImpediments)) ||
                null,
              user: JSON.stringify(data.user) || null,
            }),
          );
        });
        return Promise.all(queries).then(trx.commit).catch(trx.rollback);
      }),
  );
};
