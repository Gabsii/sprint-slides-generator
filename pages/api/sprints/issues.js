import db from '@utils/db';

const handler = async (req, res) => {
  const { id, authToken } = JSON.parse(req.body);
  let isLast = false;
  let startAt = 0;
  let issues = [];

  try {
    while (!isLast) {
      let data = await fetch(
        `https://jira.towa-digital.com/rest/agile/1.0/sprint/${id}/issue?maxResults=250&startAt=${startAt}&fields=issuetype,status,assignee,description,summary,project,customfield_10008`,
        {
          headers: {
            Authorization: `Basic ${authToken}`,
          },
        },
      ).then(response => response.json());
      startAt += data.maxResults;
      isLast = startAt > data.total;
      issues = [...issues, data.issues].flat();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }

  const filteredStories = issues.filter(
    issue =>
      issue.fields.issuetype.name === 'Story' &&
      issue.fields.customfield_10008 > 0 &&
      issue.fields.status.name === 'Closed',
  );

  // group stories by project name
  // this needs to be spreaded into an object
  // because it otherwises causes problems with JSON.stringify()
  const stories = {
    ...filteredStories.reduce((accumulator, currentValue) => {
      const project = currentValue.fields.project.name;

      accumulator[project]
        ? accumulator[project].push(currentValue)
        : (accumulator[project] = [currentValue]);

      return accumulator;
    }, []),
  };

  const bugs = issues.filter(
    issue =>
      issue.fields.issuetype.name === 'Bug' &&
      issue.fields.status.name === 'Closed',
  );

  const others = issues.filter(
    issue =>
      issue.fields.issuetype.name !== 'Story' &&
      issue.fields.issuetype.name !== 'Sub-task' &&
      issue.fields.issuetype.name !== 'Bug' &&
      issue.fields.status.name === 'Closed',
  );

  return res.status(200).send({ stories, bugs, others });
};

export default db()(handler);
