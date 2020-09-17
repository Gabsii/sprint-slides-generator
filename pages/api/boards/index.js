function cleanupBoards(boards) {
  return boards.map((board) => {
    delete board.self;
    delete board.type;
    return board;
  });
}

export default async (req, res) => {
  const { authToken, showMore = false, search = 'Team' } = JSON.parse(req.body);

  if (!authToken) {
    return res.status(422).send();
  }

  let boards = [];
  let isLast = false;
  let startAt = 0;

  if (showMore) {
    while (!isLast) {
      let data = await fetch(
        `https://jira.towa-digital.com/rest/agile/1.0/board?type=scrum&startAt=${startAt}&name=${search}`,
        {
          headers: {
            Authorization: `Basic ${authToken}`,
          },
        },
      ).then((response) => response.json());

      try {
        isLast = data.isLast;
        boards = [...boards, data.values].flat();
        startAt = data.startAt + data.maxResults;
      } catch (error) {
        console.error(error);
        return res.status(500).send(error);
      }
    }
  } else {
    boards = await fetch(
      `https://jira.towa-digital.com/rest/agile/1.0/board?type=scrum&name=${search}`,
      {
        headers: {
          Authorization: `Basic ${authToken}`,
        },
      },
    )
      .then((response) => response.json())
      .then((response) => response.values);
  }

  console.log(search);
  if (search === 'Team') {
    boards = boards
      .filter((board) => !board.name.includes('Copy'))
      .filter((board) => !board.name.includes('intern'));
  }

  boards = cleanupBoards(boards);

  return res.status(200).send(boards);
};
