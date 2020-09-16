import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import Layout from '@components/Layout';
import { TokenContext } from '@utils/ctx/TokenContext';
import withSession from '@utils/session';
import sessionData from '@utils/session/data';
import useSWR from 'swr';
import { Button, Row, Text, Link, Col, Loading } from '@zeit-ui/react';
import { RefreshCw } from '@zeit-ui/react-icons';
import api from '@utils/api';

const SprintOverview = dynamic(() => import('@components/SprintOverview'), {
  loading: () => <Loading />,
});

const Dashboard = ({ user, favourites, activeSprints, authToken, errors }) => {
  const { token, setToken } = useContext(TokenContext);
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    if (token && authToken) {
      setToken(authToken);
    }
  }, [authToken]);

  const retoggleFetch = () => {
    setShouldFetch(false);
    setTimeout(() => setShouldFetch(true), 10);
  };

  const { sprints, error, isValidating } = useSWR(
    shouldFetch ? '/api/sprints/active' : null,
    url =>
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({ favourites, authToken }),
      }).then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`HTTP Code ${res.status} - ${res.statusText}`);
      }),
    { shouldRetryOnError: false, dedupingInterval: 100 },
  );

  return (
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
        <Row align="middle" justify="space-between" style={{ width: '100%' }}>
          <Text h2>Active Sprints</Text>
          <Button
            auto
            size="small"
            iconRight={<RefreshCw />}
            onClick={() =>
              shouldFetch ? retoggleFetch() : setShouldFetch(true)
            }
          >
            Refresh
          </Button>
        </Row>
        {error && (
          <Row>
            <Text span>oh no something went wrong {error.message}</Text>
          </Row>
        )}
        {/* {!!favourites.length && <FavouritesSlider favourites={favourites} />} */}
        {(sprints && sprints.length > 0) || activeSprints.length > 0 ? (
          <Row style={{ width: '100%' }}>
            <SprintOverview
              sprints={sprints || activeSprints}
              user={user}
              isValidating={isValidating}
            />
          </Row>
        ) : (
          <Col align="middle">
            <Text h3>Welcome!</Text>
            <Text p style={{ textAlign: 'center' }}>
              Looks like this is your first time here! <br />
              To efficiently use the SprintSlidesGenerator you have to set your
              favourite boards first!
            </Text>
            <Link color block href="/boards">
              Click here to set your favourite boards
            </Link>
          </Col>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps = withSession(async function({ req, res }) {
  let errors = [];
  const user = sessionData(req, res, 'user');
  const authToken = sessionData(req, res, 'authToken');
  if (!user || !authToken) return { props: null };

  const [favourites, favouritesError] = await api('/boards/favourites', {
    method: 'POST',
    body: JSON.stringify({ user }),
  });
  favouritesError && errors.push(favouritesError);

  const [activeSprints, activeSprintsError] = await api('/sprints/active', {
    method: 'POST',
    body: JSON.stringify({ favourites, authToken }),
  });

  activeSprintsError && errors.push(activeSprintsError);

  return {
    props: {
      user: req.session.get('user'),
      authToken: req.session.get('authToken'),
      favourites,
      activeSprints,
      errors,
    },
  };
});

export default Dashboard;

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  authToken: PropTypes.string.isRequired,
  favourites: PropTypes.array,
  activeSprints: PropTypes.array,
  errors: PropTypes.array,
};
