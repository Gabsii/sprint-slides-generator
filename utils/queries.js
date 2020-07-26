export const findOrCreateBoard = async (knex, id, name) =>
  knex
    .transaction(trx =>
      trx('boards')
        .whereRaw('id = ?', id)
        .then(res => {
          if (res.length === 0) {
            return trx('boards')
              .insert({
                id,
                name,
                jira_url: `https://jira.towa-digital.com/secure/RapidBoard.jspa?rapidView=${id}`,
              })
              .then(() => trx('boards').whereRaw('id = ?', id));
          } else {
            return res;
          }
        }),
    )
    .then(res => res[0]);

export const findOrCreateUser = async (
  knex,
  { emailAddress, name, displayName, avatarUrls },
) =>
  knex
    .transaction(trx =>
      trx('users')
        .whereRaw('email = ?', emailAddress)
        .then(res => {
          if (res.length === 0) {
            return trx('users')
              .insert({
                name,
                full_name: displayName,
                email: emailAddress,
                avatar: `${avatarUrls['48x48']}&size=xxlarge`,
              })
              .then(() => trx('users').whereRaw('email = ?', emailAddress));
          } else {
            return res;
          }
        }),
    )
    .then(res => res[0]);

export const addFavourite = async (knex, dbBoard, dbUser) =>
  await knex('user_has_favourite_boards').insert({
    user_id: dbUser.id,
    board_id: dbBoard.id,
  });

export const removeFavourite = async (knex, dbBoard, dbUser) =>
  await knex('user_has_favourite_boards')
    .where({
      user_id: dbUser.id,
      board_id: dbBoard.id,
    })
    .del();
