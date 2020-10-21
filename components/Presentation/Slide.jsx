import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  height: 100vh;
  max-height: 100vh;
  width: 100%;

  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
  background-color: ${({ hasBackground, theme }) =>
    !hasBackground ? theme.colors.slides.background : 'transparent'};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px;

  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const Slide = ({ children, isActive }) => {
  // checks if a background is available and sets background-color otherwise.
  let hasBackground;

  if (children.length > 1) {
    hasBackground = children.map(
      (child) =>
        child &&
        child.props &&
        child.props.src === '/sprint-final-background.png',
    );
    console.log('children', children);
  } else {
    hasBackground = children.props.src === '/sprint-final-background.png';
    console.log('child', children);
  }

  console.log(hasBackground);

  return (
    <Wrapper hasBackground={hasBackground} isActive={isActive}>
      {children}
    </Wrapper>
  );
};

export default Slide;

Slide.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  isActive: PropTypes.bool,
  isSaved: PropTypes.bool,
};

/** Unit Tests:
 *
 * - is active slide
 * - has children
 * - has single child
 * - can render
 * - has Background as child
 */
