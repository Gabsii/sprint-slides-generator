import { useMemo } from 'react';
import PropTypes from 'prop-types';

import withSession from '@utils/session';
import sessionData from '@utils/session/data';
import db from '@utils/db';
import { getSprintBySlug } from '@utils/queries';
import api from '@utils/api';
import { SprintDataProvider } from '@utils/ctx/SprintDataContext';
import Head from 'next/head';

import Presentation from '@components/Presentation';
import IntroSlide from '@components/SlideTypes/IntroSlide';
import Overview from '@components/SlideTypes/Overview';
import TeamOverview from '@components/SlideTypes/TeamOverview';
import Bugs from '@components/SlideTypes/Bugs';
import CompletedStorypoints from '@components/SlideTypes/CompletedStorypoints';
import StoriesSlide from '@components/SlideTypes/StoriesSlide';
import {
  storiesDone,
  completedStoryPoints,
  pointsNeedReview,
} from '../@utils/sprintMetrics';
// ? unused for now import HighlightsImpediments from '@components/Presentation/SlideTypes/HighlightsImpediments';

const createStories = stories =>
  Object.entries(stories)
    .map(([projectName, stories]) => {
      let temp = [];

      const mappedStories = stories
        .map((story, index) => {
          if (index % 2 === 0) {
            let twoStories = temp.concat(story);
            temp = [];
            return twoStories;
          }
          temp.push(story);
        })
        .filter(stories => stories)
        .sort((first, second) => {
          if (first.length < second.length) {
            return 1;
          } else if (first.length > second.length) {
            return -1;
          }
          return 0;
        });

      return mappedStories.map((stories, index) => (
        <StoriesSlide
          key={`StoryMapper-${projectName}-${index}`}
          heading={
            mappedStories.length > 1
              ? `${projectName} ${index + 1}/${mappedStories.length}`
              : projectName
          }
          stories={stories}
        />
      ));
    })
    .flat();

const Sprint = ({ user, currentSprint, data }) => {
  // TODO assignee/team overview

  const memoUser = useMemo(() => user, [user]);
  const memoCurrentSprint = useMemo(() => currentSprint, [currentSprint]);
  const assignees = useMemo(() => data.assignees, [data]);
  const stories = useMemo(() => data.stories, [data]);
  const bugs = useMemo(() => data.bugs, [data]);
  const others = useMemo(() => data.others, [data]);

  const completedStories = storiesDone(stories);

  if (completedStories === 0) {
    // todo improve this
    return <div>no stories done</div>;
  }

  const completedPoints = completedStoryPoints(stories, bugs, others);

  const pointsInReview = pointsNeedReview(data);

  return (
    <SprintDataProvider
      user={memoUser}
      tasks={data}
      currentSprint={memoCurrentSprint}
      assignees={assignees}
    >
      <Head>
        <title>{memoCurrentSprint.sprintName} | SprintGenerator</title>
      </Head>
      <Presentation isSaved={!!memoCurrentSprint.isSaved}>
        <IntroSlide
          name={memoCurrentSprint.sprintName}
          team={memoCurrentSprint.boardName}
          startDate={memoCurrentSprint.startDate}
          endDate={memoCurrentSprint.endDate}
          presenterName={memoUser.displayName || memoUser.name}
        />
        <TeamOverview assignees={data.assignees} />
        {stories !== {} && <Overview stories={stories} />}
        {/* <HighlightsImpediments /> */}
        {createStories(stories)}
        {bugs.length > 0 && <Bugs bugs={bugs} />}
        <CompletedStorypoints
          completed={memoCurrentSprint.achievement || completedPoints}
          forecast={memoCurrentSprint.forecast}
          completedTickets={completedStories + bugs.length + others.length}
          ticketsInReview={data.inReview.length}
          pointsInReview={pointsInReview}
        />
      </Presentation>
    </SprintDataProvider>
  );
};

const getSessionData = withSession(async (req, res) => ({
  user: sessionData(req, res, 'user', false),
  authToken: sessionData(req, res, 'authToken', false),
}));

const handler = async (req, res, query) => {
  let data, jsonData;
  let errors = [];
  const knex = req.db;
  const { user, authToken } = await getSessionData(req, res);

  const currentSprint = JSON.parse(
    JSON.stringify(await getSprintBySlug(knex, query.slug)),
  )[0];

  if (!currentSprint) {
    res.statusCode = 302;
    res.setHeader('Location', '/404');
    res.end();
    return { props: {} };
  }

  if (!user.name && !currentSprint.isSaved) {
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
    return { props: {} };
  }

  if (!currentSprint.isSaved) {
    const [issues, issuesError] = await api(`/sprints/issues`, {
      method: 'POST',
      body: JSON.stringify({ id: currentSprint.id, authToken }),
    });
    issuesError && errors.push(issuesError);
    data = issues;
  } else {
    jsonData = JSON.parse(currentSprint.data);
    data = {
      stories: jsonData.tasks.stories,
      bugs: jsonData.tasks.bugs,
      others: jsonData.tasks.others,
      inReview: jsonData.tasks.inReview,
      assignee: jsonData.assignees,
    };
  }

  errors.length > 0 && console.error(errors);

  return {
    props: {
      user: user.name !== undefined ? user : jsonData.user,
      currentSprint,
      data,
    },
    // TODO: SSG
    // revalidate: 1,
    // fallback: true,
  };
};

// TODO export const getStaticProps
// had to do it like this so that I wouldn't need any extra api calls if necessary
export const getServerSideProps = async ({ req, res, query }) =>
  db()(handler)(req, res, query);

export default Sprint;

Sprint.propTypes = {
  user: PropTypes.object,
  currentSprint: PropTypes.object,
  data: PropTypes.object,
};
