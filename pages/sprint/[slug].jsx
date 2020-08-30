import { useMemo } from 'react';
import PropTypes from 'prop-types';

import withSession from '@utils/session';
import sessionData from '@utils/session/data';
import db from '@utils/db';
import { getSprintBySlug } from '@utils/queries';
import api from '@utils/api';

import Presentation from '@components/Presentation';
import IntroSlide from '@components/Presentation/SlideTypes/IntroSlide';
import Overview from '@components/Presentation/SlideTypes/Overview';
import Bugs from '@components/Presentation/SlideTypes/Bugs';
import CompletedStorypoints from '@components/Presentation/SlideTypes/CompletedStorypoints';
// ? unused for now import HighlightsImpediments from '@components/Presentation/SlideTypes/HighlightsImpediments';

const Sprint = ({ user, currentSprint, data, error }) => {
  // TODO if error show modal
  // TODO if no user (unauthenticated) in session display error modal

  const stories = useMemo(() => data.stories, [data]);
  const bugs = useMemo(() => data.bugs, [data]);
  const others = useMemo(() => data.others, [data]);

  const completedStories = Object.values(stories).reduce(
    (acc, curr) => (acc += curr.length),
    0,
  );
  const completedPoints = Object.values(stories).reduce(
    (acc, curr) =>
      (acc += curr.reduce(
        (newAcc, story) => (newAcc += story.fields.customfield_10008),
        0,
      )),
    0,
  );

  return (
    <Presentation>
      <IntroSlide
        name={currentSprint.sprintName}
        team={currentSprint.boardName}
        startDate={currentSprint.startDate}
        endDate={currentSprint.endDate}
        presenterName={user.displayName || user.name}
      />
      <Overview stories={stories} />
      {/* <HighlightsImpediments /> */}
      <Bugs bugs={bugs} />
      <CompletedStorypoints
        completed={completedPoints}
        forecast={currentSprint.forecast}
        completedTickets={completedStories + bugs.length + others.length}
      />
    </Presentation>
  );
};

const getSessionData = withSession(async (req, res) => ({
  user: sessionData(req, res, 'user', false),
  authToken: sessionData(req, res, 'authToken', false),
}));

const handler = async (req, res, query) => {
  let errors = [];
  const knex = req.db;
  const { user, authToken } = await getSessionData(req, res);

  const currentSprint = JSON.parse(
    // todo: innerjoin boards table on id
    JSON.stringify(await getSprintBySlug(knex, query.slug)),
  )[0];

  const [data, dataError] = await api(`/sprints/issues`, {
    method: 'POST',
    body: JSON.stringify({ id: currentSprint.id, authToken }),
  });
  dataError && errors.push(dataError);

  return {
    props: {
      user,
      currentSprint,
      data,
      errors,
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
  errors: PropTypes.array,
};
