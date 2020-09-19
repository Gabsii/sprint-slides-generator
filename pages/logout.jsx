import { Router } from 'next/router';

import withSession from '@utils/session';

const Logout = () => {
  Router.replace('/');
  return null;
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
