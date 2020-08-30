import { getDatabaseConnector } from '@utils/db/db-injector';
const connector = getDatabaseConnector();

// eslint-disable-next-line no-unused-vars
export default (...args) => fn => async (req, res, query) => {
  req.db = connector();
  const functionResult = await fn(req, res, query);
  await req.db.destroy();
  return functionResult;
};
