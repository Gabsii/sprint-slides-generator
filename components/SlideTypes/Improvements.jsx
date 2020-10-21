import PropTypes from 'prop-types';
import ProgressiveImage from 'react-progressive-image';
import styled from 'styled-components';

import Slide from '@components/Presentation/Slide';
import Heading from '@components/Presentation/Heading';
import { Overflowable } from '@components/Presentation/Overflowable';
import UnorderedList from '@components/Presentation/UnorderedList';
import SavePresentation from '@components/SavePresentation';
import AvatarPlaceholder from '@components/AvatarPlaceholder';

const Avatar = styled.img`
  height: 24px;

  box-sizing: content-box;
  border: 3px solid ${({ theme }) => theme.colors.avatar};
  border-radius: 100%;
  margin-right: 25px;
`;

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

const Improvements = ({ improvements, isActive, isSaved }) => (
  <Slide isActive={isActive}>
    <Heading type="h6" textAlign="left">
      {improvements.length} Improvements
    </Heading>
    <Overflowable>
      <UnorderedList listStyle="none">
        {improvements.map((story) => (
          <div
            key={`Bug-${story.key}`}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {story.fields.assignee ? (
              <ProgressiveImage
                src={`/api/users/${story.fields.assignee.name}?size=xxlarge`}
                placeholder=""
              >
                {(src, loading) =>
                  loading ? (
                    <AvatarPlaceholder
                      size="24px"
                      stlye={{ display: 'inline-block', marginRight: '1.5rem' }}
                      hasBorder={true}
                    />
                  ) : (
                    <Avatar
                      src={src}
                      alt={story.fields.assignee.name}
                      text={story.fields.assignee.name.split(' ')[0]}
                      size="medium"
                      style={{
                        display: 'inline-block',
                        margin: 0,
                        marginRight: '1.5rem',
                      }}
                    />
                  )
                }
              </ProgressiveImage>
            ) : (
              <AvatarPlaceholder
                size="24px"
                hasBorder={true}
                style={{
                  marginRight: '1.5rem',
                  height: '30px',
                  minWidth: '30px',
                }}
              />
            )}
            <StoryPoints>{story.fields.customfield_10008}</StoryPoints>
            <span>{`${story.key}: ${story.fields.summary}`}</span>
          </div>
        ))}
      </UnorderedList>
    </Overflowable>
    {!isSaved && <SavePresentation />}
  </Slide>
);

export default Improvements;

Improvements.propTypes = {
  improvements: PropTypes.array,
  isActive: PropTypes.bool,
  isSaved: PropTypes.bool,
};
