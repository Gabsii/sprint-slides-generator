import Layout from '@components/Layout';
import withSession from '@utils/session';
import { Router } from 'next/router';

const Logout = () => {
  Router.replace('/');
  return (
    <div>
      <Layout title="Homepage">
        <div style={{ minHeight: '100vh' }}>Bye Bye</div>
      </Layout>
    </div>
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
