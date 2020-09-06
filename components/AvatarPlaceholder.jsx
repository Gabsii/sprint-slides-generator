import styled from 'styled-components';

const AvatarPlaceholder = styled.div`
  display: inline-block;
  background-color: black;
  box-sizing: border-box;
  height: ${({ size }) => size || '128px'};
  width: ${({ size }) => size || '128px'};
  flex: 0 0 ${({ size }) => size || '128px'};
  border-radius: 100%;

  ${({ hasBorder, theme }) =>
    hasBorder && `border: 3px solid ${theme.colors.avatar};`}
`;

export default AvatarPlaceholder;
