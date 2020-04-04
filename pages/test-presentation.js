import Slide from '@components/Presentation/Slide';
import Heading from '@components/Presentation/Heading';
import Text from '@components/Presentation/Text';
import Background from '@components/Presentation/Background';
import Presentation from '@components/Presentation/Presentation';

const TestPresentation = () => (
  <Presentation>
    <Slide>
      <Heading type="h1">Hello</Heading>
      <Text>This is some generically generated text.</Text>
      <Background
        src="https://images.unsplash.com/photo-1570786097801-b8b9531ed5cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9"
        alt="dayoum a bee"
      />
    </Slide>
    <Slide>
      <Heading>Another Heading on the second Slide</Heading>
      <Background
        src="https://images.unsplash.com/photo-1500862321-177c80d8ca32?ixlib=rb-1.2.1"
        alt="another bee"
      />
    </Slide>
    <Slide>
      <Heading>Another Heading on the third slide baby</Heading>
      <Background
        src="https://cdn.pixabay.com/photo/2016/04/25/23/54/hummel-1353423_960_720.jpg"
        alt="another bee"
        type="image"
      />
    </Slide>
    <Slide>
      <Heading>Another Heading on the fourth slide baby</Heading>
    </Slide>
    <Slide>
      <Heading>Another Heading on the fourth slide baby</Heading>
      <Heading>Another Heading on the fourth slide baby</Heading>
    </Slide>
    <Slide>
      <Text>Nothing to see here...</Text>
    </Slide>
  </Presentation>
);

export default TestPresentation;
