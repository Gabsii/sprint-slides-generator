import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Tabs, Link, useTheme, Avatar, Row, Col } from '@zeit-ui/react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const StyledTabs = styled(Tabs)`
  width: 100%;
  height: 100%;

  .content {
    padding: 0;
    margin: 0;
    height: 0;
  }
`;

const Container = styled(Row)`
  max-width: 750pt;
  padding: 0 16pt;
  margin: 0 auto !important;
`;

const Header = ({ user }) => {
  const router = useRouter();
  const { palette } = useTheme();
  const [stickyHeader, setStickyHeader] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;

    if (offset > 50) {
      setStickyHeader(true);
    } else {
      setStickyHeader(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <div style={{ height: '50px' }}>
      <div
        style={{
          backgroundColor: palette.background,
          width: '100vw',
          position: 'fixed',
          left: 0,
          top: 0,
          height: '50px',
          boxShadow: stickyHeader && '0 2px 15px 0 rgba(0,0,0,0.2)',
        }}
      >
        <Container>
          <Col>
            <StyledTabs initialValue={router.asPath} hideDivider>
              <Tabs.Item
                label={
                  <NextLink href="/dashboard" passHref>
                    <Link style={{ padding: '10px 8px' }}>Sprints</Link>
                  </NextLink>
                }
                value="/dashboard"
              ></Tabs.Item>
              <Tabs.Item
                label={
                  <NextLink href="/boards" passHref>
                    <Link style={{ padding: '10px 8px' }}>Boards</Link>
                  </NextLink>
                }
                value="/boards"
              ></Tabs.Item>
              <Tabs.Item
                label={
                  <NextLink href="/presentations" passHref>
                    <Link style={{ padding: '10px 8px' }}>Presentations</Link>
                  </NextLink>
                }
                value="/presentations"
              ></Tabs.Item>
            </StyledTabs>
          </Col>
          <Col
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Avatar size="small" src={`/api/users/${user.name}?size=xxlarge`} />
          </Col>
          {!stickyHeader && (
            <hr
              style={{
                borderWidth: 0,
                borderStyle: 'solid',
                borderBottom: `1px solid ${palette.accents_2}`,
                margin: 0,
                width: '100vw',
                left: 0,
                position: 'fixed',
                top: '52px',
              }}
            />
          )}
        </Container>
      </div>
    </div>
  );
};

export default Header;

Header.propTypes = {
  user: PropTypes.object,
};
