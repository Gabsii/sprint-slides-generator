import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState, cloneElement, useEffect } from 'react';
import useKeyPress from '@utils/useKeyPress';

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

  &:disabled {
    cursor: not-allowed;
    filter: opacity(0.5);
  }
`;

const Presentation = ({ children }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const rightPressed = useKeyPress('ArrowRight');
  const leftPressed = useKeyPress('ArrowLeft');

  useEffect(() => {
    if (rightPressed && activeSlide < children.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else if (leftPressed && activeSlide !== 0) {
      setActiveSlide(activeSlide - 1);
    }
  }, [rightPressed, leftPressed]);

  const teenager = children.map((child, index) =>
    cloneElement(child, {
      id: `slide-${index}`,
      key: `slide-${index}`,
      isActive: activeSlide === index,
    }),
  );

  return (
    <Wrapper>
      <Button
        position="left"
        disabled={activeSlide === 0}
        onClick={() => {
          if (activeSlide !== 0) {
            setActiveSlide(activeSlide - 1);
          }
        }}
      >
        {'<'}
      </Button>
      <div>{teenager}</div>
      <Button
        position="right"
        disabled={activeSlide === teenager.length - 1}
        onClick={() => {
          if (activeSlide < children.length) {
            setActiveSlide(activeSlide + 1);
          }
        }}
      >
        {'>'}
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
 * - buttons are disabled
 * - can click button
 * - can navigate button via arrow keys
 */
