import styled from 'styled-components';
import PropTypes from 'prop-types';

const FooterOuter = styled.footer`
  width: 100%;

  display: ${({ displayFooter }) => (displayFooter ? 'flex' : 'none')};

  background-color: ${({ theme }) => theme.colors.navBackground};

  box-sizing: border-box;
`;

const FooterInner = styled.div`
  width: 100%;
  max-width: 1024px;

  margin: 0 auto;
  padding: 1rem 2rem;
`;

const Footer = ({ children, displayFooter }) => (
  <>
    <FooterOuter displayFooter={displayFooter}>
      <FooterInner>{children}</FooterInner>
    </FooterOuter>
  </>
);

export default Footer;

Footer.propTypes = {
  children: PropTypes.element,
  displayFooter: PropTypes.bool,
};
