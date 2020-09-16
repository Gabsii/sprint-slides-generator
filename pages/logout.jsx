import { Page } from '@zeit-ui/react';
import Head from 'next/head';
import { Router } from 'next/router';

import withSession from '@utils/session';

const Logout = () => {
  Router.replace('/');
  return (
    <Page>
      <Head>
        <title>Logout | SprintGenerator</title>
      </Head>
      <Page.Content>
        <div style={{ minHeight: '100vh' }}>Bye Bye</div>
      </Page.Content>
    </Page>
  );
};

export const getServerSideProps = withSession(async function({ req, res }) {
  req.session.destroy();

  res.writeHead(302, { Location: '/' });
  res.end();
  return {
    props: {},
  };
});

export default Logout;
