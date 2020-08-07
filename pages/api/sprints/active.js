import { sub } from 'date-fns';

const handler = async (req, res) => {
  const { favourites, authToken } = JSON.parse(req.body);
  let data = [];

  try {
    await Promise.all(
      favourites.map(favourite =>
        fetch(
          `https://jira.towa-digital.com/rest/agile/1.0/board/${favourite.id}/sprint?state=active`,
          {
            headers: {
              Authorization: `Basic ${authToken}`,
            },
          },
        )
          .then(res => res.json())
          .then(res =>
            res.values.map(sprint => {
              data.push({ jiraBoardId: favourite.id, ...sprint });
            }),
          ),
      ),
    );

    // remove open sprints and duplicates
    data = data.filter(
      (sprint, index, array) =>
        new Date(sprint.endDate) > sub(Date.now(), { days: 2 }) &&
        array.findIndex(t => t.id === sprint.id) === index,
    );

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default handler;
