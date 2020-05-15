import Head from 'next/head';
import Layout from '@components/Layout';
import LoginForm from '@components/LoginForm';

const Home = () => (
  <div>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout title="Index.js">
      <div style={{ height: '100vh' }}>
        <LoginForm />
      </div>
    </Layout>
  </div>
);

export default Home;
