import db from '@utils/db';
import { findOrCreateUser, getAllFavouriteBoardsByUser } from '@utils/queries';

const handler = async (req, res) => {
  const { user } = JSON.parse(req.body);

  const knex = req.db;

  const dbUser = await findOrCreateUser(knex, user);

  try {
    const data = await getAllFavouriteBoardsByUser(knex, dbUser);
    return res.status(200).send(data);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(200).end();
    }
    return res.status(500).send(error);
  }
};

export default db()(handler);
