import Layout from '@components/Layout';
import LoginForm from '@components/LoginForm';
import withSession from '@utils/session';

const Home = () => (
  <div>
    <Layout title="Homepage">
      <div style={{ height: '100vh' }}>
        <LoginForm />
      </div>
    </Layout>
  </div>
);

export const getServerSideProps = withSession(async function({ req, res }) {
  const authToken = req.session.get('authToken');

  if (authToken === undefined) {
    return { props: {} };
  }

  res.setHeader('Location', '/dashboard');
  res.statusCode = 302;
  res.end();
  return {
    props: { authToken: req.session.get('authToken') },
  };
});

export default Home;
