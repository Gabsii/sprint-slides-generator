import styled from 'styled-components';
import PropTypes from 'prop-types';
import Image from '@components/Presentation/Image';
import { darken } from 'polished';

const CardWrapper = styled.figure`
  min-height: 200px;
  width: 150px;

  text-align: center;
  color: ${({ theme }) => theme.colors.link || '#000000'};

  background-color: ${({ theme }) => theme.colors.card || 'rgba(0,0,0,0.7)'};
  padding: 20px;
  margin: 0 auto;
`;

const FigCaption = styled.figcaption`
  margin-top: 1em;
  line-height: 1.5;
  text-align: center;
`;

const Name = styled.div`
  font-size: 1.1vmax;
  color: ${({ theme }) => theme.colors.text};
`;

const Job = styled.div`
  font-size: 0.825vmax;
  color: ${({ theme }) => darken(0.33, theme.colors.text)};
`;

const Card = ({
  src = 'https://www.atlassian.design/server/images/avatars/person-invalid-96px.png',
  alt = 'User Avatar',
  name = 'User',
  job,
}) => (
  <CardWrapper>
    <Image
      src={src}
      alt={alt}
      rounded={true}
      style={{ border: `1px solid ${darken(0.5, '#ffffff')}` }}
    />
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
