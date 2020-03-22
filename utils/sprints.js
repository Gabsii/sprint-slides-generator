let stories = [];
let bugs = [];

export const getAllSprints = (auth, baseUrl, id, startValue = 0) => {
  let data = [];
  fetch(
    `${baseUrl}/rest/agile/1.0/board/${id}/sprint?=${startValue}&state=active`,
  )
    .then(res => res.json())
    .then(res => {
      data.push(res.value);
      if (!res.isLast) getAllSprints(auth, baseUrl, (startValue += 50));
    })
    .catch(e => console.log(e));
  return data;
};

export const getCurrentSprint = (auth, baseUrl, id, startValue = 0) => {
  let data = [];
  // TODO: call each issue for the estimation, rather than using customfield_100008
  fetch(
    `${baseUrl}/rest/agile/1.0/sprint/${id}/issue?maxResults=250&fields=issuetype,status,assignee,description, summary, customfield_10008`,
  )
    .then(res => res.json())
    .then(res => {
      data.push(res.issues);
      if (res.startAt + res.maxResults < res.total) {
        getAllSprints(auth, baseUrl, (startValue += 250));
      }
    })
    .catch(e => console.log(e));

  stories = data.filter(issue => issue.fields.issuetype.name === 'Story');
  bugs = data.filter(issue => issue.fields.issuetype.name === 'Bug');
  return data;
};

export default { stories, bugs };
