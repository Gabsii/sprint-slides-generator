import styled from 'styled-components';
import PropTypes from 'prop-types';
import ProgressiveImage from 'react-progressive-image';
import { darken } from 'polished';

import AvatarPlaceholder from '@components/AvatarPlaceholder';

const CardWrapper = styled.figure`
  min-height: 200px;
  width: 150px;

  text-align: center;
  color: ${({ theme }) => theme.colors.link || '#000000'};

  background-color: ${({ theme }) => theme.colors.card || 'rgba(0,0,0,0.7)'};
  padding: 20px;
  margin: 10px;
`;

const Avatar = styled.img`
  height: 96px;

  box-sizing: content-box;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.45);

  border-radius: 100%;
  margin-right: 25px;
`;

const FigCaption = styled.figcaption`
  margin-top: 1em;
  line-height: 1.5;
  text-align: center;
`;

const Name = styled.div`
  font-size: 0.75em;
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 2px;
  word-spacing: 300px;
`;

const Job = styled.div`
  font-size: 0.5em;
  color: ${({ theme }) => darken(0.33, theme.colors.text)};
`;

const Card = ({
  src = 'https://www.atlassian.design/server/images/avatars/person-invalid-96px.png',
  alt = 'User Avatar',
  name = 'User',
  job,
}) => (
  <CardWrapper>
    <ProgressiveImage src={src} placeholder="">
      {(src, loading) =>
        loading ? (
          <AvatarPlaceholder size="102px" />
        ) : (
          <Avatar
            src={src}
            alt={alt}
            text={name}
            size="large"
            style={{ minWidth: '96px', margin: 0 }}
          />
        )
      }
    </ProgressiveImage>
    <FigCaption>
      <Name>{name}</Name>
      <Job>{job}</Job>
    </FigCaption>
  </CardWrapper>
);

export default Card;

Card.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  job: PropTypes.string,
};

/** Unit Tests:
 *
 * - does not render children
 * - can render
 */
