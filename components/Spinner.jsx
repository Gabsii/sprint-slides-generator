import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const pulseSize = '96px';
const pulseColor = '#18466E';
const pulseColorDark = '#E7B991';
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
  border: 1px solid ${({ dark }) => (dark ? pulseColorDark : pulseColor)};
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

export const SpinnerWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FullSpinnerWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ dark }) =>
    dark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const Spinner = ({ dark }) => (
  <LoadingPulse>
    <Circle dark={dark} />
    <Circle dark={dark} />
  </LoadingPulse>
);

Spinner.propTypes = {
  dark: PropTypes.bool,
};

export default Spinner;
