import styled, { keyframes } from 'styled-components';

const pulseSize = '96px';
const pulseColor = '#18466E';
const pulseDuration = '2s';

const pulse = keyframes`
  from {
    width: 0px;
    height: 0px;
    opacity: 0;
  }
  4% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  70% {
    width: ${pulseSize};
    height: ${pulseSize};
    margin-left: -${pulseSize} / 2;
    margin-top: -${pulseSize} / 2;
    opacity: 0;
  }
`;

const LoadingPulse = styled.div`
  height: ${pulseSize};
  width: ${pulseSize};
`;

const Circle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border: 1px solid ${pulseColor};
  border-radius: 50%;
  opacity: 0;
  will-change: opacity;

  &:nth-child(1) {
    animation: ${pulse} ${pulseDuration} 0.3s infinite;
  }

  &:nth-child(2) {
    animation: ${pulse} ${pulseDuration} 0.6s infinite;
  }
`;

const Spinner = () => (
  <LoadingPulse>
    <Circle />
    <Circle />
  </LoadingPulse>
);

export default Spinner;
