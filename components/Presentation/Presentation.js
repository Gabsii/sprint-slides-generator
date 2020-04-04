import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState, cloneElement } from 'react';

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const Button = styled.button`
  /* height: 100%; */
  /* width: 50%; */

  position: absolute;
  top: 50%;
  right: 0;
  z-index: +1;
  transform: translateY(-50%);

  background-color: transparent;

  padding: 0 2rem;
  border: none;
  outline: none;

  font-size: 3rem;
  font-weight: bold;
  text-align: right;

  color: ${({ theme }) => theme.colors.text};

  &:first-of-type {
    left: 0;
    text-align: left;
  }

  &:hover {
    cursor: pointer;
  }
`;

const Presentation = ({ children }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  if (activeSlide >= children.length) {
    setActiveSlide(children.length - 1);
  } else if (activeSlide < 0) {
    setActiveSlide(0);
  }

  const teenager = children.map((child, index) =>
    cloneElement(child, {
      id: `slide-${index}`,
      key: `slide-${index}`,
      isActive: activeSlide === index,
    }),
  );

  return (
    <Wrapper>
      <Button position="left" onClick={() => setActiveSlide(activeSlide - 1)}>
        -
      </Button>
      <div>{teenager}</div>
      <Button position="right" onClick={() => setActiveSlide(activeSlide + 1)}>
        +
      </Button>
    </Wrapper>
  );
};

export default Presentation;

Presentation.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

/** Unit Tests:
 *
 * - has active slide
 * - can increase/decrease active slide
 * - children have key set
 * - children have isActive set
 */
