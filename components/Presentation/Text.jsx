import styled from 'styled-components';
import PropTypes from 'prop-types';

const TextWrapper = styled.p`
  color: ${({ theme }) => theme.colors.text || '#000000'};

  position: ${({ position }) => (position ? 'absolute' : 'initial')};
  top: ${({ position }) => (position === 'top' ? '25px' : 'initial')};
  bottom: ${({ position }) => (position === 'bottom' ? '25px' : 'initial')};

  font-size: 24px;
  font-size: 2vw;
  text-align: ${({ textAlign }) => textAlign};
`;

const Text = ({ children, position, textAlign = 'center' }) => (
  <TextWrapper position={position} textAlign={textAlign}>
    {children}
  </TextWrapper>
);

export default Text;

Text.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  textAlign: PropTypes.oneOf([
    'center',
    'right',
    'left',
    'end',
    'start',
    'justify',
  ]),
  position: PropTypes.oneOf(['top', 'bottom']),
};

/** Unit Tests:
 *
 * - has children
 * - has single child
 * - can render
 * - renders with top/bottom as position if set
 */
