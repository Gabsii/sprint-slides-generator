import Head from 'next/head';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Normalize } from 'styled-normalize';

import Header from '@components/Header';
import Main from '@components/Main';
import Footer from '@components/Footer';

const LayoutWrapper = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const Layout = ({ children, title, displayHeader, displayFooter }) => (
  <LayoutWrapper>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Normalize />
    <Header displayHeader={displayHeader}>
      <span>hello</span>
    </Header>
    <Main>{children}</Main>
    <Footer displayFooter={displayFooter}>
      <a
        href="https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by <img src="/zeit.svg" alt="ZEIT Logo" />
      </a>
    </Footer>
  </LayoutWrapper>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
  displayHeader: PropTypes.bool,
  displayFooter: PropTypes.bool,
};

Layout.defaultProps = {
  title: 'This is the default title',
  displayHeader: true,
  displayFooter: true,
};
