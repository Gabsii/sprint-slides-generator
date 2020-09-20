import db from '@utils/db';
import { getAllActivePresentations } from '@utils/queries';

const handler = async (req, res) => {
  const knex = req.db;

  try {
    const presentations = await getAllActivePresentations(knex);
    return res.status(200).send(presentations);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

export default db()(handler);
