import styled from 'styled-components';
import { lighten } from 'polished';

const Button = styled.button`
  min-width: 80px;

  font-weight: bold;

  padding: 0.5rem 0.75rem;
  outline: none;
  border: 2px solid black;
  background-color: lightgreen;
  border-radius: 0.5rem;

  &:hover {
    cursor: pointer;

    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.45);
  }

  &:active {
    background-color: ${lighten(0.1, 'lightgreen')};
  }

  &:disabled {
    background-color: darkgray;
  }
`;

export default Button;
