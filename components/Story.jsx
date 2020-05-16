import styled from 'styled-components';
import PropTypes from 'prop-types';

const Avatar = styled.img`
  height: 96px;

  box-sizing: content-box;
  border: 3px solid ${({ theme }) => theme.colors.avatar};
  border-radius: 100%;
  margin-right: 25px;
`;

const Main = styled.article`
  display: flex;
  width: 100%;
  flex-direction: column;
  border-left: ${({ hasBorder, theme }) =>
    hasBorder ? `3px solid ${theme.colors.story.general}` : ''};

  padding: 0 50px;
`;

const Flex = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`;

const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

const StoryName = styled.span`
  padding: 10px 0;

  font-size: 24px;
  font-size: 3.5vh;
`;

const StoryShortname = styled.span`
  width: 180px;
  height: 30px;
  background-color: ${({ theme }) =>
    theme.colors.story.shortname || 'lightgray'};
  color: black;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const StoryPoints = styled.span`
  width: 70px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.story.general || 'gray'};

  border-radius: 99999px;
  margin-left: 25px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;
  text-align: center;
`;

const Description = styled.div`
  color: #989998;
  width: 100%;

  display: grid;
  grid-template-rows: minmax(min-content, 40vh);

  padding: 2rem;
  font-size: 20px;
  font-size: 2.5vh;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Stage = styled.a`
  width: 250px;
  height: 50px;

  color: ${({ theme }) => theme.colors.primaryFont};
  text-transform: uppercase;

  border: 3px solid ${({ theme }) => theme.colors.story.general};

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

// TODO: shorten description
// TODO: description from MD to HTML

/**
 * story: {
 *   name: fields.summary
 *   shortName: key,
 *   points: customfield_10008
 * }
 */

const Story = ({ assignee, description, story, hasBorder }) => {
  // TODO: filter link from description, otherwise remove field
  const link = 'https://gabsii.com';
  return (
    <Main hasBorder={hasBorder}>
      <Flex>
        <Avatar
          alt={assignee.name}
          src={`${assignee.avatarUrls['48x48']}&size=xxlarge`}
        />
        <FlexColumn>
          <StoryName>{story.name}</StoryName>
          <Flex>
            <StoryShortname>{story.shortName}</StoryShortname>
            <StoryPoints>{story.points}</StoryPoints>
          </Flex>
        </FlexColumn>
      </Flex>
      <Description>{description}</Description>
      {link ? (
        <Stage href={link} target="_blank">
          Stage
        </Stage>
      ) : null}
    </Main>
  );
};
export default Story;

Story.propTypes = {
  assignee: PropTypes.object,
  description: PropTypes.string,
  story: PropTypes.object,
  hasBorder: PropTypes.bool,
};

/** Unit Tests:
 *
 * - does not render children
 * - can render
 */
