import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProgressiveImage from 'react-progressive-image';

import AvatarLoader from '@components/AvatarLoader';
import AvatarPlaceholder from '@components/AvatarPlaceholder';
import Image from '@components/Presentation/Image';
import Layout from '@components/Layout';
import SprintOverview from '@components/SprintOverview';
import { TokenContext } from '@utils/ctx/TokenContext';
import withSession from '@utils/session';
import FavouritesSlider from '@components/FavouritesSlider';

const Dashboard = ({ user, favourites, activeSprints, authToken }) => {
  const { token, setToken } = useContext(TokenContext);

  useEffect(() => {
    if (token && authToken) {
      setToken(authToken);
    }
  }, [authToken]);

  return (
    <div>
      <Layout title="Dashboard" displayHeader={false} displayFooter={false}>
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <a href="/boards">Set favourite boards</a>
          {/* <p style={{ marginBottom: '4em' }}>Hello there, {user.name}</p>
          <ProgressiveImage
            src={`${user.avatarUrls['48x48']}&size=xxxlarge`}
            placeholder=""
          >
            {(src, loading) =>
              loading ? (
                <AvatarLoader>
                  <AvatarPlaceholder />
                </AvatarLoader>
              ) : (
                <AvatarLoader>
                  <Image src={src} alt={user.name} rounded={true} />
                </AvatarLoader>
              )
            }
          </ProgressiveImage> */}
          {/* {!!favourites.length && <FavouritesSlider favourites={favourites} />} */}
          <SprintOverview sprints={activeSprints}></SprintOverview>
        </div>
      </Layout>
    </div>
  );
};

export const getServerSideProps = withSession(async function({ req, res }) {
  const user = req.session.get('user');
  const authToken = req.session.get('authToken');

  if (user === undefined || authToken === undefined) {
    res.setHeader('location', '/');
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  const favouritesResponse = await fetch(
    `http://${req.headers.host}/api/boards/favourites`,
    {
      method: 'POST',
      body: JSON.stringify({ user }),
    },
  );

  let favourites, activeSprints;

  // todo: simplify try catch for every response
  try {
    favourites = await favouritesResponse.json();
  } catch (error) {
    console.error(error);
    return {
      props: {
        user: req.session.get('user'),
        authToken: req.session.get('authToken'),
        error,
      },
    };
  }

  const activeSprintsResponse = await fetch(
    `http://${req.headers.host}/api/sprints/active`,
    {
      method: 'POST',
      body: JSON.stringify({ favourites, authToken }),
    },
  );

  try {
    activeSprints = await activeSprintsResponse.json();
  } catch (error) {
    console.error(error);
    return {
      props: {
        user: req.session.get('user'),
        authToken: req.session.get('authToken'),
        error,
      },
    };
  }

  return {
    props: {
      user: req.session.get('user'),
      authToken: req.session.get('authToken'),
      favourites,
      activeSprints,
    },
  };
});

export default Dashboard;

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  authToken: PropTypes.string.isRequired,
  favourites: PropTypes.array,
  activeSprints: PropTypes.array,
};
