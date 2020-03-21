import Head from 'next/head';
import Layout from '@components/Layout';

const Home = () => (
  <div>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout title="Index.js">
      <div>here comes the content</div>
    </Layout>
  </div>
);

export default Home;
