import Slide from '@components/Presentation/Slide';
import Heading from '@components/Presentation/Heading';
import Text from '@components/Presentation/Text';
import Background from '@components/Presentation/Background';
import Presentation from '@components/Presentation';
import Grid from '@components/Presentation/Grid';
import UnorderedList from '@components/Presentation/UnorderedList';
import Card from '../components/Card';
import styled from 'styled-components';

const Overflowable = styled.div`
  width: 80%;
  height: 100%;
  max-height: 100vh;

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
      <Heading type="h6" textAlign="left">
        Team 503
      </Heading>
      <Grid columns={3}>
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
        Overview
      </Heading>
      <Overflowable>
        <OverflowableItem>
          <Text textAlign="left">Iss G'hörig</Text>
          <UnorderedList>
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
          <UnorderedList>
            <p>Bestandsaufnahme</p>
          </UnorderedList>
        </OverflowableItem>
        <OverflowableItem>
          <Text textAlign="left">Grünländer</Text>
          <UnorderedList>
            <p>Styling Eigenheiten</p>
            <p>Multiple Nutrition Tables</p>
          </UnorderedList>
        </OverflowableItem>
        <OverflowableItem>
          <Text textAlign="left">Patros</Text>
          <UnorderedList>
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
          <UnorderedList>
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
  </Presentation>
);

export default TestPresentation;
