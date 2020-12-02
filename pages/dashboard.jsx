import { useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import PageLoader from '../components/PageLoader';
import withSession from '../utils/session';
import sessionData from '../utils/session/data';
import useSWR from 'swr';
import { Button, Row, Text, Link, Col, Loading, Page } from '@zeit-ui/react';
import { RefreshCw } from '@zeit-ui/react-icons';
import api from '../utils/api';
import { DashboardLoaderProvider } from '../utils/ctx/DashboardLoaderContext';
import Header from '../components/Header';

const SprintOverview = dynamic(() => import('../components/SprintOverview'), {
  loading: () => <Loading />,
});

const Dashboard = ({ user, favourites, activeSprints, authToken, errors }) => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const retoggleFetch = () => {
    setShouldFetch(false);
    setTimeout(() => setShouldFetch(true), 10);
  };

  const { sprints, error, isValidating } = useSWR(
    shouldFetch ? '/api/sprints/active' : null,
    (url) =>
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({ favourites, authToken }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`HTTP Code ${res.status} - ${res.statusText}`);
      }),
    { shouldRetryOnError: false, dedupingInterval: 100 },
  );

  return (
    <Page>
      <Head>
        <title>Dashboard | SprintGenerator</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Page.Header>
        <Header user={user} />
      </Page.Header>
      <Page.Content>
        <DashboardLoaderProvider setSpinner={setSpinner}>
          <PageLoader externalSpinner={spinner} />
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
                To efficiently use the SprintSlidesGenerator you have to set
                your favourite boards first!
              </Text>
              <Link color block href="/boards">
                Click here to set your favourite boards
              </Link>
            </Col>
          )}
        </DashboardLoaderProvider>
      </Page.Content>
    </Page>
  );
};

export const getServerSideProps = withSession(async function ({ req, res }) {
  let errors = [];
  const user = sessionData(req, res, 'user');
  const authToken = sessionData(req, res, 'authToken');
  if (!user || !authToken) {
    res.end();
    return { props: null };
  }

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
      user,
      authToken,
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
