import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import { Page, Text } from '@zeit-ui/react';
import Head from 'next/head';

import sessionData from '@utils/session/data';
import withSession from '@utils/session';
import Header from '@components/Header';
import PageLoader from '@components/PageLoader';

const Presentations = ({ user }) => {
  const [startFetching, setStartFetching] = useState(false);
  useEffect(() => setStartFetching(true), []);

  const { presentations, error, isValidating } = useSWR(
    startFetching ? '/api/presentations' : null,
    url =>
      fetch(url, {
        method: 'POST',
      }).then(res => res.json()),
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
      </Page.Content>
    </Page>
  );
};

export const getServerSideProps = withSession(async function({ req, res }) {
  const user = sessionData(req, res, 'user');

  return {
    props: {
      user,
    },
  };
});

export default Presentations;

Presentations.propTypes = {
  user: PropTypes.object,
};
