import PropTypes from 'prop-types';
import { Page, Text } from '@zeit-ui/react';
import Head from 'next/head';

import sessionData from '@utils/session/data';
import withSession from '@utils/session';
import Header from '@components/Header';

const Presentations = ({ user }) => (
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
      <Text h2 style={{ marginBottom: '1rem' }}>
        Presentations
      </Text>
    </Page.Content>
  </Page>
);

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
