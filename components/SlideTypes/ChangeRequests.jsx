import PropTypes from 'prop-types';
import ProgressiveImage from 'react-progressive-image';
import styled from 'styled-components';

import Slide from '@components/Presentation/Slide';
import Heading from '@components/Presentation/Heading';
import { Overflowable } from '@components/Presentation/Overflowable';
import UnorderedList from '@components/Presentation/UnorderedList';
import SavePresentation from '@components/SavePresentation';
import AvatarPlaceholder from '@components/AvatarPlaceholder';
import StoryPoints from '@components/Atoms/StoryPoints';

const Avatar = styled.img`
  height: 24px;

  transition: 500ms ease-in-out;

  box-sizing: content-box;
  border: 3px solid ${({ theme }) => theme.colors.avatar};
  border-radius: 100%;
  margin-right: 25px;
`;

const ChangeRequests = ({ changeRequests, isActive, isSaved }) => (
  <Slide isActive={isActive}>
    <Heading type="h6" textAlign="left">
      {changeRequests.length} Change Requests
    </Heading>
    <Overflowable>
      <UnorderedList listStyle="none">
        {changeRequests.map((story) => (
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
                      stlye={{
                        display: 'inline-block',
                        marginRight: '1rem',
                        transition: '500ms ease-in-out',
                      }}
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
                        marginRight: '1rem',
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
                  marginRight: '1rem',
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

export default ChangeRequests;

ChangeRequests.propTypes = {
  changeRequests: PropTypes.array,
  isActive: PropTypes.bool,
  isSaved: PropTypes.bool,
};
