import { getDatabaseConnector } from '@utils/db/db-injector';
const connector = getDatabaseConnector();

// eslint-disable-next-line no-unused-vars
export default (...args) => fn => async (req, res) => {
  req.db = connector();
  await fn(req, res);
  await req.db.destroy();
  return;
};
