import withSession from '@utils/session';

export default withSession(async (req, res) => {
  const {
    query: { name, size = '' },
  } = req;
  const authToken = req.session.get('authToken');

  if (!authToken) {
    return res.status(401).end();
  }

  const response = await fetch(
    `https://jira.towa-digital.com/rest/api/2/user?username=${name}`,
    {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    },
  );

  try {
    const user = await response.json();
    const avatarUrl = user.avatarUrls['48x48'];
    const image = await fetch(`${avatarUrl}&size=${size}`, {
      headers: {
        Authorization: `Basic ${authToken}`,
        'content-type': 'image/png',
      },
    }).then(imageResponse => imageResponse.blob());
    res.setHeader('content-type', 'image/png');
    res.setHeader('cache-control', 's-maxage=1, stale-while-revalidate');

    return res.status(200).send(image.stream());
  } catch (e) {
    console.error(e);
    return res.status(500).send(e);
  }
});
