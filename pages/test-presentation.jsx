import Slide from '@components/Presentation/Slide';
import UnorderedList from '@components/Presentation/UnorderedList';
import OrderedList from '@components/Presentation/OrderedList';
import Heading from '@components/Presentation/Heading';
import Text from '@components/Presentation/Text';
import Link from '@components/Presentation/Link';
import Background from '@components/Presentation/Background';
import Presentation from '@components/Presentation';
import Grid from '../components/Presentation/Grid';

const TestPresentation = () => (
  <Presentation>
    <Slide>
      <Text>Sprint 32</Text>
      <Heading type="h1">Sprint Review</Heading>
      <Heading type="h6">Team 503</Heading>
      <Text position="bottom">
        12.03.2020-25.03.2020
        <br />
        Presented by Lukas Gabsi
      </Text>
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
      <Link href="https://www.theguardian.com/environment/bees">
        Nothing to see here...
      </Link>
    </Slide>
    <Slide>
      <UnorderedList>
        <div>this</div>
      </UnorderedList>
      <OrderedList>
        <div>this</div>
        <div>is</div>
        <div>an</div>
        <div>ordered</div>
        <div>list</div>
      </OrderedList>
    </Slide>
    <Slide>
      <Grid>
        <Heading>Hello</Heading>
        <Heading>Hello</Heading>
        <Heading>Hello</Heading>
        <Heading>Hello</Heading>
        <Heading>Hello</Heading>
        <Heading>Hello</Heading>
        <Heading>Hello</Heading>
      </Grid>
    </Slide>
  </Presentation>
);

export default TestPresentation;
