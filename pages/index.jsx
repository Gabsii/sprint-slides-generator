import Layout from '@components/Layout';
import LoginForm from '@components/LoginForm';
import withSession from '@utils/session';
import sessionData from '@utils/session/data';

const Home = () => (
  <div>
    <Layout title="Homepage">
      <div style={{ minHeight: '100vh' }}>
        <LoginForm />
      </div>
    </Layout>
  </div>
);

export const getServerSideProps = withSession(async function({ req, res }) {
  const authToken = sessionData(req, res, 'authToken');
  if (!authToken) return { props: null };

  return {
    props: { authToken },
  };
});

export default Home;
