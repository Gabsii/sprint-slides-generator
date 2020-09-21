import { sub } from 'date-fns';
import db from '@utils/db';
import { allSprints } from '@utils/queries';
import slugify from 'slugify';

const handler = async (req, res) => {
  const { favourites, authToken } = JSON.parse(req.body);
  const knex = req.db;

  let apiData = [];
  let dbData = [];

  console.log(favourites);

  try {
    await Promise.all(
      favourites.map((favourite) =>
        fetch(
          `https://jira.towa-digital.com/rest/agile/1.0/board/${favourite.id}/sprint?state=active`,
          {
            headers: {
              Authorization: `Basic ${authToken}`,
            },
          },
        )
          .then((res) => res.json())
          .then((res) =>
            res.values.map((sprint) => {
              apiData.push({ jiraBoardId: favourite.id, ...sprint });
            }),
          ),
      ),
      await allSprints(knex).then(
        (res) => (dbData = JSON.parse(JSON.stringify(res))),
      ),
    );

    // remove open sprints and duplicates
    apiData = apiData
      .filter(
        (sprint, index, array) =>
          new Date(sprint.endDate) > sub(Date.now(), { days: 1 }) &&
          array.findIndex((t) => t.id === sprint.id) === index,
      )
      .map((sprint) => {
        sprint.forecast = sprint.forecast || 0;
        sprint.slug =
          sprint.slug ||
          slugify(sprint.name, {
            lower: true,
            locale: 'de',
            remove: /[*+~.()'"!:@]/g,
          });
        return sprint;
      })
      .filter(
        (apiSprint) => !dbData.some((dbSprint) => dbSprint.id === apiSprint.id),
      );

    const data = [...apiData, ...dbData].filter((sprint) =>
      favourites.some(
        (fav) =>
          fav.id === sprint.originBoardId ||
          fav.id === parseInt(sprint.boardId),
      ),
    );

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default db()(handler);
