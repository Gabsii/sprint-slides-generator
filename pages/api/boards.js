export default async (req, res) => {
  const { authToken } = JSON.parse(req.body);

  if (!authToken) {
    return res.status(422).send();
  }

  let boards = [];
  let isLast = false;
  let startAt = 0;

  while (!isLast) {
    let data = await fetch(
      `https://jira.towa-digital.com/rest/agile/1.0/board?type=scrum&startAt=${startAt}`,
      {
        headers: {
          Authorization: `Basic ${authToken}`,
        },
      },
    ).then(response => response.json());

    try {
      isLast = data.isLast;
      boards = [...boards, data.values].flat();
      startAt = data.startAt + data.maxResults;
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  }

  boards.sort(a => {
    if (a.name.includes('Team')) {
      return -1;
    }
    return 0;
  });

  return res.status(200).send(boards);
};
