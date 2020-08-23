import db from '@utils/db';
import {
  addFavourite,
  removeFavourite,
  findOrCreateBoard,
  findOrCreateUser,
} from '@utils/queries';

const handler = async (req, res) => {
  const { name = '', user } = JSON.parse(req.body);
  const {
    query: { id },
  } = req;
  const knex = req.db;

  const dbBoard = await findOrCreateBoard(knex, id, name);
  const dbUser = await findOrCreateUser(knex, user);

  if (req.method === 'PUT') {
    try {
      await addFavourite(knex, dbBoard, dbUser);
      return res.status(200).end();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(200).end();
      }
      return res.status(500).send(error);
    }
  } else if (req.method === 'DELETE') {
    try {
      await removeFavourite(knex, dbBoard, dbUser);
      return res.status(200).end();
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  return res.status(200).end();
};

export default db()(handler);
