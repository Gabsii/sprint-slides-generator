import PropTypes from 'prop-types';

import withSession from '@utils/session';
import sessionData from '@utils/session/data';
import db from '@utils/db';
import { getSprintBySlug } from '@utils/queries';
import api from '@utils/api';

import Presentation from '@components/Presentation';
import IntroSlide from '@components/Presentation/SlideTypes/IntroSlide';
import Overview from '@components/Presentation/SlideTypes/Overview';

const Sprint = ({ user, currentSprint, data, error }) => (
  // TODO if no user in session display error modal
  // console.log(user);
  // if (user) {
  //   return <div>Sorry, you&apos;re not logged in...</div>;
  // }
  // TODO use memo for bugs, stories and others
  <Presentation>
    <IntroSlide
      name={currentSprint.name}
      team={''}
      startDate={currentSprint.startDate}
      endDate={currentSprint.endDate}
      presenterName={user.displayName || user.name}
    />
    <Overview stories={data.stories} />
  </Presentation>
);

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
