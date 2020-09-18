import { Image, Link, Page, Row, Text } from '@zeit-ui/react';
import NextLink from 'next/link';

const Custom404 = () => (
  <Page>
    <Page.Content>
      <Text h1>404 - Page Not Found</Text>
      <Text h2>Looks like you went out of your boundaries!</Text>
      <Row>
        <Text>
          Maybe you want to go back to&nbsp;
          <NextLink href="/dashboard" passHref>
            <Link color>where you started?</Link>
          </NextLink>
        </Text>
        <Image
          height={500}
          src="https://media.giphy.com/media/VwoJkTfZAUBSU/source.gif"
        ></Image>
      </Row>
    </Page.Content>
  </Page>
);

export default Custom404;
