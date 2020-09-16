import db from '@utils/db';
import { createOrUpdateSprint, addSprintData } from '@utils/queries';

const handler = async (req, res) => {
  const { sprint } = JSON.parse(req.body);
  const {
    query: { id },
  } = req;
  const knex = req.db;

  if (req.method === 'PUT') {
    try {
      await createOrUpdateSprint(knex, id, sprint);
      return res.status(200).end();
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  } else if (req.method === 'PATCH') {
    try {
      await addSprintData(knex, id, sprint);
      return res.status(200).send('OK');
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  }

  return res.status(200).end();
};

export default db()(handler);
