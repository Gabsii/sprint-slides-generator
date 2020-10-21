import styled from 'styled-components';

const StoryPoints = styled.span`
  width: 70px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.story.general || 'gray'};

  border-radius: 99999px;
  margin-right: 1.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 18px;
  text-align: center;
`;

export default StoryPoints;