import styled from 'styled-components';
import PropTypes from 'prop-types';
import ProgressiveImage from 'react-progressive-image';
import ReactMarkdown from 'react-markdown';

import AvatarPlaceholder from '@components/AvatarPlaceholder';
import markdownDefaults from '../utils/markdownDefaults';

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
  max-height: 100%;
  flex-direction: column;

  border-left: ${({ hasBorder, theme }) =>
    hasBorder && `3px solid ${theme.colors.story.general}`};
  padding: 0 50px;

  /* position: absolute; */
  top: 150px;
`;

const Flex = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`;

const FlexColumn = styled(Flex)`
  flex-direction: column;
  margin-left: 2em;
`;

const StoryName = styled.span`
  padding: 10px 0;

  font-size: 26px;
`;

const StoryShortname = styled.span`
  width: 180px;
  min-height: 30px;
  background-color: ${({ theme }) =>
    theme.colors.story.shortname || 'lightgray'};
  color: black;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 18px;
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

  font-size: 18px;
  text-align: center;
`;

const Description = styled.div`
  color: #989998;
  width: 100%;

  display: grid;
  grid-template-rows: minmax(min-content, 40vh);

  padding: 2rem;
  font-size: 20px;
  font-size: 2.5vmin;
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

const MarkdownParser = styled(ReactMarkdown)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;

  ul {
    color: #989998;
  }
`;

/**
 * story: {
 *   name: fields.summary
 *   shortName: key,
 *   points: customfield_10008
 * }
 */

const Story = ({ assignee, story, hasBorder }) => {
  // TODO: filter link from description, otherwise remove field
  const link = null;
  return (
    <Main hasBorder={hasBorder}>
      <Flex>
        {assignee ? (
          <ProgressiveImage
            src={`/api/users/${assignee.name}?size=xxlarge`}
            placeholder=""
          >
            {(src, loading) =>
              loading ? (
                <AvatarPlaceholder size="102px" hasBorder={true} />
              ) : (
                <Avatar
                  src={src}
                  alt={assignee.name}
                  text={assignee.name.split(' ')[0]}
                  size="large"
                  style={{ minWidth: '96px', margin: 0 }}
                />
              )
            }
          </ProgressiveImage>
        ) : (
          <AvatarPlaceholder />
        )}
        <FlexColumn>
          <StoryName>{story.fields.summary}</StoryName>
          <Flex>
            <StoryShortname>{story.key}</StoryShortname>
            <StoryPoints>{story.fields.customfield_10008}</StoryPoints>
          </Flex>
        </FlexColumn>
      </Flex>
      <Description>
        <MarkdownParser
          source={story.fields.description}
          renderers={markdownDefaults}
        />
      </Description>
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
