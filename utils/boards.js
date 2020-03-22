const getAllBoards = (auth, baseUrl, startValue = 0) => {
  // https://jira.towa-digital.com/rest/agile/1.0/board?startAt=50&type=scrum
  // Authorization: Basic abcdefghiklmnopqrstuvwxyz==
  let data = [];
  fetch(`${baseUrl}/rest/agile/1.0/board?startAt=${startValue}&type=scrum`)
    .then(res => {
      res.json();
      data.push(res.value);
      if (!res.isLast) getAllBoards(auth, baseUrl, (startValue += 50));
    })
    .catch(e => console.log(e));
  return data;
};

export default getAllBoards;
