import Slide from '@components/Presentation/Slide';
import Heading from '@components/Presentation/Heading';
import Text from '@components/Presentation/Text';
import Background from '@components/Presentation/Background';
import Presentation from '@components/Presentation';
import Grid from '@components/Presentation/Grid';
import Story from '@components/Story';
import Box from '@components/Presentation/Box';
import UnorderedList from '@components/Presentation/UnorderedList';
import Card from '@components/Card';
import styled from 'styled-components';

const Overflowable = styled.div`
  width: 80%;
  height: 100%;
  max-height: 75vh;

  margin: 5px 60px;

  display: flex;
  flex-flow: column wrap;
  align-content: flex-start;
  align-items: center;
`;

const OverflowableItem = styled.div`
  min-width: 33%;
  max-width: 50%;
`;

const TestSprint = () => (
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
      <Background src="/sprint-final-background.png" alt="dayoum a bee" />
    </Slide>
    <Slide>
      <Heading type="h6" textAlign="left">
        Team 503
      </Heading>
      <Grid>
        <Card
          alt="test"
          src="https://jira.towa-digital.com/secure/useravatar?ownerId=lukas.gabsi&avatarId=13505&size=xxlarge"
          name="Lukas Gabsi"
        />
        <Card
          alt="test"
          src="https://jira.towa-digital.com/secure/useravatar?ownerId=lukas.gabsi&avatarId=13505&size=xxlarge"
          name="Lukas Gabsi"
          job="Developer"
        />
        <Card
          alt="test"
          src="https://jira.towa-digital.com/secure/useravatar?ownerId=lukas.gabsi&avatarId=13505&size=xxlarge"
          name="Lukas Gabsi"
          job="Developer"
        />
      </Grid>
    </Slide>
    <Slide>
      <Heading type="h6" textAlign="left">
        Highlights & Impediments
      </Heading>
      <Grid columns={2} width="90%">
        <Box border="1px solid white" title="Highlights">
          <Text>Käse</Text>
          <Text>Käse</Text>
          <Text>Käse</Text>
          <Text>Käse</Text>
        </Box>
        <Box border="1px solid white" title="Impediments">
          <Text>Käse</Text>
          <Text>Käse</Text>
          <Text>Käse</Text>
          <Text>Käse</Text>
          <Text>Käse</Text>
        </Box>
      </Grid>
    </Slide>
    <Slide>
      <Heading type="h4">Hochland - alle Marken (4 SP)</Heading>
      <Grid columns={2} width="90%">
        <Story
          assignee={{
            name: 'Lukas Gabsi',
            avatarUrls: {
              '48x48':
                'https://jira.towa-digital.com/secure/useravatar?ownerId=lukas.gabsi&avatarId=13505',
            },
          }}
          story={{
            name: 'Daten-Quellen',
            shortName: 'PATROS-309',
            points: 5,
          }}
          description="description comes here"
        />
        <Story
          hasBorder={true}
          assignee={{
            name: 'Lukas Gabsi',
            avatarUrls: {
              '48x48':
                'https://jira.towa-digital.com/secure/useravatar?ownerId=lukas.gabsi&avatarId=13505',
            },
          }}
          story={{
            name: 'Daten-Quellen',
            shortName: 'PATROS-309',
            points: 5,
          }}
          description="description comes here"
        />
      </Grid>
    </Slide>
    <Slide>
      <Heading type="h6" textAlign="left">
        Overview
      </Heading>
      <Overflowable>
        <OverflowableItem>
          <Text textAlign="left">Iss G'hörig</Text>
          <UnorderedList listStyle="square">
            <p>Projekt Setup</p>
            <p>Betrieb-Registrierung</p>
            <p>E-MailTemplate & Versand</p>
            <p>Gastro-Übersicht</p>
            <p>Gastro-Einzelseite</p>
            <p>Gutschein anfordern</p>
            <p>Lieferung</p>
            <p>Mobile First</p>
            <p>Go Live</p>
          </UnorderedList>
        </OverflowableItem>
        <OverflowableItem>
          <Text textAlign="left">BTV Kontoeröffnung</Text>
          <UnorderedList listStyle="square">
            <p>Bestandsaufnahme</p>
          </UnorderedList>
        </OverflowableItem>
        <OverflowableItem>
          <Text textAlign="left">Grünländer</Text>
          <UnorderedList listStyle="square">
            <p>Styling Eigenheiten</p>
            <p>Multiple Nutrition Tables</p>
          </UnorderedList>
        </OverflowableItem>
        <OverflowableItem>
          <Text textAlign="left">Patros</Text>
          <UnorderedList listStyle="square">
            <p>Restliche Packages outsourcen</p>
            <p>Teaser Recipes Hotspot</p>
          </UnorderedList>
        </OverflowableItem>
      </Overflowable>
    </Slide>
    <Slide>
      <Heading type="h6" textAlign="left">
        Bugs
      </Heading>
      <Overflowable>
        <OverflowableItem>
          <UnorderedList listStyle="square">
            <p>HINTERN-3: Grid Inspiration IE</p>
            <p>GRUENLAEND-27: FAQ-Seite</p>
            <p>PATROS-417: IE 11 JS error</p>
            <p>PATROS-440: Neu Flag, falsche Font</p>
            <p>PATROS-391: Mobile Tabs rund</p>
            <p>PATROS-389: Menü Flyout - Mousover</p>
            <p>PATROS-290: Taxonomien: Rezeptfilter werden nicht dargestellt</p>
            <p>HLAM-27: Pixelfehler im Menü Flyout</p>
          </UnorderedList>
        </OverflowableItem>
      </Overflowable>
    </Slide>
    <Slide>
      <span>
        <Heading type="h2" display="inline-block">
          33
        </Heading>
        <Heading type="h2" display="inline-block" dark={true}>
          &nbsp;/ 30
        </Heading>
      </span>
      <Text>Completed Storypoints vs. Commitment</Text>
    </Slide>
  </Presentation>
);

export default TestSprint;
