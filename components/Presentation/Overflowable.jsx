import styled from 'styled-components';

export const Overflowable = styled.div`
  width: 80%;
  height: 100%;
  max-height: 75vh;

  margin: 5px 60px;

  display: flex;
  flex-flow: column wrap;
  align-content: flex-start;
`;

// TODO: find better fix than multiline ellipsis
export const OverflowableItem = styled.div`
  min-width: 33%;
  max-width: 50%;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 14;
  -webkit-box-orient: vertical;
`;
