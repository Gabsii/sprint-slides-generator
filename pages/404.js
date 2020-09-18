import { Image, Link, Page, Row, Text } from '@zeit-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';

const Custom404 = () => (
  <Page>
    <Head>
      <title>404 - Page Not Found | SprintGenerator</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
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
