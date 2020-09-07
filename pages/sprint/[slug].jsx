import { useMemo } from 'react';
import PropTypes from 'prop-types';

import withSession from '@utils/session';
import sessionData from '@utils/session/data';
import db from '@utils/db';
import { getSprintBySlug } from '@utils/queries';
import api from '@utils/api';

import Presentation from '@components/Presentation';
import IntroSlide from '@components/SlideTypes/IntroSlide';
import Overview from '@components/SlideTypes/Overview';
import Bugs from '@components/SlideTypes/Bugs';
import CompletedStorypoints from '@components/SlideTypes/CompletedStorypoints';
import StoriesSlide from '@components/SlideTypes/StoriesSlide';

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

const Sprint = ({ user, currentSprint, data, error }) => {
  // TODO if error show modal
  // TODO if no user (unauthenticated) in session display error modal
  // TODO screen for no stories finished

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
      {createStories(stories)}
      {bugs.length > 0 && <Bugs bugs={bugs} />}
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
