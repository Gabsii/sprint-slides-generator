export const storiesDone = (stories) =>
  stories &&
  Object.values(stories).reduce((acc, curr) => (acc += curr.length), 0);

export const completedStoryPoints = (stories, bugs, others) =>
  Object.values(stories).reduce(
    (acc, curr) =>
      (acc += curr.reduce(
        (newAcc, story) => (newAcc += story.fields.customfield_10008),
        0,
      )),
    0,
  ) ||
  0 + bugs.reduce((acc, bug) => (acc += bug.fields.customfield_10008), 0) ||
  0 +
    others.reduce((acc, other) => (acc += other.fields.customfield_10008), 0) ||
  0;

export const pointsNeedReview = (data) =>
  data.inReview.reduce(
    (acc, ticket) => (acc += ticket.fields.customfield_10008),
    0,
  );
