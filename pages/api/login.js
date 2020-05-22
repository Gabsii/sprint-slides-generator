import base64 from 'base-64';

export default async (req, res) => {
  const { username, password } = JSON.parse(req.body);

  if (!username || !password) {
    return res.status(422).send();
  }

  const authToken = base64.encode(`${username}:${password}`);

  // h7,Jy3{6!Y
  const response = await fetch(
    'https://jira.towa-digital.com/rest/api/2/myself',
    {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    },
  );

  try {
    if (response.status === 200) {
      const data = await response.json();
      return res.status(200).send(data);
    } else {
      const error = await response.text();
      console.log(error);
      return res.status(response.status).send(error);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
