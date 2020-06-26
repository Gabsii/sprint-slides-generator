import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProgressiveImage from 'react-progressive-image';

import AvatarLoader from '@components/AvatarLoader';
import AvatarPlaceholder from '@components/AvatarPlaceholder';
import Image from '@components/Presentation/Image';
import Layout from '@components/Layout';
import SprintOverview from '@components/SprintOverview';
import { TokenContext } from '@utils/ctx/TokenContext';
import withSession from '@utils/session';

const Dashboard = ({ user, authToken }) => {
  const { token, setToken } = useContext(TokenContext);

  useEffect(() => {
    if (token && authToken) {
      setToken(authToken);
    }
  }, [authToken]);

  return (
    <div>
      <Layout title="Dashboard" displayHeader={false} displayFooter={false}>
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          {/* <p style={{ marginBottom: '4em' }}>Hello there, {user.name}</p>
          <ProgressiveImage
            src={`${user.avatarUrls['48x48']}&size=xxxlarge`}
            placeholder=""
          >
            {(src, loading) =>
              loading ? (
                <AvatarLoader>
                  <AvatarPlaceholder />
                </AvatarLoader>
              ) : (
                <AvatarLoader>
                  <Image src={src} alt={user.name} rounded={true} />
                </AvatarLoader>
              )
            }
          </ProgressiveImage> */}
          <SprintOverview></SprintOverview>
        </div>
      </Layout>
    </div>
  );
};

export const getServerSideProps = withSession(async function({ req, res }) {
  const user = req.session.get('user');
  const authToken = req.session.get('authToken');

  if (user === undefined || authToken === undefined) {
    res.setHeader('location', '/');
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: {
      user: req.session.get('user'),
      authToken: req.session.get('authToken'),
    },
  };
});

export default Dashboard;

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  authToken: PropTypes.string.isRequired,
};
