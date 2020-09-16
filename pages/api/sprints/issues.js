import db from '@utils/db';

const removeUnusedIssueFields = issues =>
  issues.map(issue => {
    if (issue) {
      delete issue.expand;
      delete issue.self;

      if (issue.fields) {
        if (issue.fields.assignee) {
          delete issue.fields.assignee.active;
          delete issue.fields.assignee.self;
          delete issue.fields.assignee.timeZone;
        }

        if (issue.fields.issuetype) {
          delete issue.fields.issuetype.avatarId;
          delete issue.fields.issuetype.description;
          delete issue.fields.issuetype.iconUrl;
          delete issue.fields.issuetype.id;
          delete issue.fields.issuetype.self;
          delete issue.fields.issuetype.subtask;
        }

        if (issue.fields.project) {
          delete issue.fields.project.avatarUrls;
          delete issue.fields.project.id;
          delete issue.fields.project.projectTypeKey;
          delete issue.fields.project.self;
        }

        if (issue.fields.status) {
          delete issue.fields.status.description;
          delete issue.fields.status.iconUrl;
          delete issue.fields.status.id;
          delete issue.fields.status.self;
          delete issue.fields.status.statusCategory;
        }
      }
    }
    return issue;
  });

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

  // remove unnecessary data
  issues = removeUnusedIssueFields(issues);

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

  const inReview = issues.filter(
    issue =>
      (issue.fields.issuetype.name === 'Story' ||
        issue.fields.issuetype.name === 'Bug' ||
        issue.fields.issuetype.name === 'Change Request') &&
      issue.fields.status.name === 'In Review',
  );

  return res.status(200).send({ stories, bugs, others, inReview });
};

export default db()(handler);
