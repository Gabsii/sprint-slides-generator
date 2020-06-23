import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const pulse = keyframes`
  0% {
    opacity: 0;
    margin-top: -0.25em;
    margin-left: -0.25em;
    width: 0.5em;
    height: 0.5em;
  }
  
  10% {
    opacity: 1;
  }
  
  100% {
    margin-top: -7.5em;
    margin-left: -7.5em;
    opacity: 1;
    height: 15em;
    width: 15em;
  }
`;

const pulse2 = keyframes`
  0%, 25% {
    opacity: 0;
    margin-top: -0.25em;
    margin-left: -0.25em;
    width: 0.5em;
    height: 0.5em;
  }
  
  35% {
    opacity: 1;
  }
  
  100% {
    margin-top: -7.5em;
    margin-left: -7.5em;
    opacity: 1;
    height: 15em;
    width: 15em;
  }
`;

const Wrapper = styled.div`
  transform: translateX(50%) translateY(50%);
`;

const Circle = styled.div`
  position: absolute;
  width: 0.5em;
  height: 0.5em;
  opacity: 0;
  animation-iteration-count: infinite;
  animation-duration: 1.75s;
  animation-direction: foward;
  animation-timing-function: ease-out;

  &:nth-child(1) {
    animation-name: ${pulse};
  }

  &:nth-child(2) {
    animation-name: ${pulse2};
  }

  &::after,
  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
  }

  &::before {
    left: 40%;
    top: 40%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right, #c5c5c5, transparent);
    transform: rotate(45deg);
    opacity: 0.3;
  }

  &::after {
    box-shadow: 2px 2px 5px #ddd;
    position: absolute;
    border-radius: 50%;
    background-color: white;
  }
`;

const ChildWrapper = styled.div`
  z-index: 100;
  transform: translateX(-50%) translateY(-50%);
`;

const AvatarLoader = ({ children }) => (
  <Wrapper>
    <Circle></Circle>
    <Circle></Circle>
    <ChildWrapper>{children}</ChildWrapper>
  </Wrapper>
);

export default AvatarLoader;

AvatarLoader.propTypes = {
  children: PropTypes.node,
};
