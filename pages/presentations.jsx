import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import { Page, Text } from '@zeit-ui/react';
import Head from 'next/head';

import Header from '@components/Header';
import PageLoader from '@components/PageLoader';
import PresentationOverview from '@components/PresentationOverview';
import sessionData from '@utils/session/data';
import withSession from '@utils/session';
import api from '@utils/api';

const Presentations = ({ user, presentations }) => {
  const [startFetching, setStartFetching] = useState(false);
  useEffect(() => setStartFetching(true), []);

  const { fetchedPresentations, error, isValidating } = useSWR(
    startFetching ? '/api/presentations' : null,
    (url) =>
      fetch(url, {
        method: 'POST',
      }).then((res) => res.json()),
    { shouldRetryOnError: false, dedupingInterval: 100 },
  );

  return (
    <Page>
      <Head>
        <title>Presentations | SprintGenerator</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Page.Header>
        <Header user={user} />
      </Page.Header>
      <Page.Content>
        <PageLoader />
        <Text h2 style={{ marginBottom: '1rem' }}>
          Presentations
        </Text>
        <PresentationOverview
          presentations={fetchedPresentations || presentations}
          isValidating={isValidating}
          user={user}
        />
      </Page.Content>
    </Page>
  );
};

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = sessionData(req, res, 'user');
  if (!user) {
    res.end();
    return { props: null };
  }

  const [presentations, presentationsError] = await api('/presentations', {
    method: 'POST',
  });

  presentationsError && console.error(presentationsError);

  return {
    props: {
      user,
      presentations,
    },
  };
});

export default Presentations;

Presentations.propTypes = {
  user: PropTypes.object,
  presentations: PropTypes.array,
};
