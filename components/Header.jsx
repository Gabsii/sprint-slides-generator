import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Tabs,
  Link,
  useTheme,
  Avatar,
  Row,
  Col,
  Popover,
  Toggle,
} from '@zeit-ui/react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const StyledTabs = styled(Tabs)`
  width: 100%;
  height: 100%;

  .tab {
    padding: 0 !important;
  }

  .tab .link {
    padding: 15px 12px;
  }

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
  height: 100%;
`;

const HoverableAvatar = styled(Avatar)`
  &:hover {
    cursor: pointer;
    box-shadow: 0 0px 30px rgba(0, 0, 0, 0.12);
  }
`;

const PopoverContent = ({ user }) => (
  <>
    <Popover.Item title>
      <span>Hello {user && user.displayName}!</span>
    </Popover.Item>
    <Popover.Item>
      <Row>
        Dark Mode
        <Toggle disabled style={{ marginLeft: '1rem' }} />
      </Row>
    </Popover.Item>
    <Popover.Item line />
    <Popover.Item>
      <NextLink href="/logout" passHref>
        <Link>Logout</Link>
      </NextLink>
    </Popover.Item>
  </>
);

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
                    <Link>Sprints</Link>
                  </NextLink>
                }
                value="/dashboard"
              ></Tabs.Item>
              <Tabs.Item
                label={
                  <NextLink href="/boards" passHref>
                    <Link>Boards</Link>
                  </NextLink>
                }
                value="/boards"
              ></Tabs.Item>
              <Tabs.Item
                label={
                  <NextLink href="/presentations" passHref>
                    <Link>Presentations</Link>
                  </NextLink>
                }
                value="/presentations"
              ></Tabs.Item>
            </StyledTabs>
          </Col>
          <Col
            style={{
              width: 'auto',
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Popover content={<PopoverContent user={user} />}>
              <HoverableAvatar
                size="small"
                src={`/api/users/${user.name}?size=medium`}
              />
            </Popover>
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

PopoverContent.propTypes = {
  user: PropTypes.object,
};

Header.propTypes = {
  user: PropTypes.object,
};
