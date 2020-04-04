import { useState } from 'react';
import styled from 'styled-components';

const boards = {
  maxResults: 50,
  startAt: 50,
  isLast: false,
  values: [
    {
      id: 262,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/262',
      name: 'Unifinanz',
      type: 'scrum',
    },
    {
      id: 268,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/268',
      name: 'SCRUM Board',
      type: 'scrum',
    },
    {
      id: 270,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/270',
      name: 'Entwickler Wochenplanung',
      type: 'scrum',
    },
    {
      id: 272,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/272',
      name: 'Stadtwerke Wörgl (STWW)',
      type: 'scrum',
    },
    {
      id: 274,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/274',
      name: 'Inet Logistics',
      type: 'scrum',
    },
    {
      id: 282,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/282',
      name: 'Gränicher & Sagmeister',
      type: 'scrum',
    },
    {
      id: 284,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/284',
      name: 'Jena MICE',
      type: 'scrum',
    },
    {
      id: 285,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/285',
      name: 'Stabiq',
      type: 'scrum',
    },
    {
      id: 287,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/287',
      name: 'Burgwald und Petersboden',
      type: 'scrum',
    },
    {
      id: 305,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/305',
      name: 'BTV Garantieservice Scrum',
      type: 'scrum',
    },
    {
      id: 309,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/309',
      name: 'BTV Kontoeröffnung',
      type: 'scrum',
    },
    {
      id: 314,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/314',
      name: 'Feratel Plugin Buchungsprozess (Vollintegration)',
      type: 'scrum',
    },
    {
      id: 315,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/315',
      name: 'Übergabe Marko & Tech Roadmap',
      type: 'scrum',
    },
    {
      id: 319,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/319',
      name: 'AK Digital Campus',
      type: 'scrum',
    },
    {
      id: 320,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/320',
      name: 'TOWA Library',
      type: 'scrum',
    },
    {
      id: 323,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/323',
      name: 'CLC - Corporate Learning & Change',
      type: 'scrum',
    },
    {
      id: 328,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/328',
      name: 'Team Y - Scrum Wochenplanung',
      type: 'scrum',
    },
    {
      id: 331,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/331',
      name: 'Seidl',
      type: 'scrum',
    },
    {
      id: 335,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/335',
      name: 'Vips',
      type: 'scrum',
    },
    {
      id: 341,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/341',
      name: 'Testprojekt 1',
      type: 'scrum',
    },
    {
      id: 352,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/352',
      name: 'floMobil',
      type: 'scrum',
    },
    {
      id: 353,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/353',
      name: 'Test BEN',
      type: 'scrum',
    },
    {
      id: 363,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/363',
      name: 'Team-Y - Sprints',
      type: 'scrum',
    },
    {
      id: 364,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/364',
      name: 'BTV Bankier 2.0',
      type: 'scrum',
    },
    {
      id: 371,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/371',
      name: 'Confluence und Jira Neugestaltung',
      type: 'scrum',
    },
    {
      id: 372,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/372',
      name: 'Sagemax_alt',
      type: 'scrum',
    },
    {
      id: 373,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/373',
      name: 'Thomas Pegram',
      type: 'scrum',
    },
    {
      id: 374,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/374',
      name: 'Hirschmann Automotive',
      type: 'scrum',
    },
    {
      id: 375,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/375',
      name: 'CBT Scrum',
      type: 'scrum',
    },
    {
      id: 376,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/376',
      name: 'freicom.towa.digital - Bereitstellung Landingpage',
      type: 'scrum',
    },
    {
      id: 385,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/385',
      name: 'Dachvisionen',
      type: 'scrum',
    },
    {
      id: 386,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/386',
      name: 'BASWA',
      type: 'scrum',
    },
    {
      id: 389,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/389',
      name: 'Sigma Bank Relaunch',
      type: 'scrum',
    },
    {
      id: 390,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/390',
      name: 'Dachvisionen Landingpage',
      type: 'scrum',
    },
    {
      id: 392,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/392',
      name: 'ASI',
      type: 'scrum',
    },
    {
      id: 393,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/393',
      name: 'Haberkorn',
      type: 'scrum',
    },
    {
      id: 394,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/394',
      name: 'HAGEN Testprojekt',
      type: 'scrum',
    },
    {
      id: 399,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/399',
      name: 'BTV | Unifinanz',
      type: 'scrum',
    },
    {
      id: 400,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/400',
      name: 'Typo Media Mäser',
      type: 'scrum',
    },
    {
      id: 401,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/401',
      name: 'Kopie von Lech Zürs Tourismus',
      type: 'scrum',
    },
    {
      id: 402,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/402',
      name: 'IMA Schelling Landingpage',
      type: 'scrum',
    },
    {
      id: 403,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/403',
      name: 'W&L Asset Management AG',
      type: 'scrum',
    },
    {
      id: 404,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/404',
      name: 'Team-X Sprint Backlog',
      type: 'scrum',
    },
    {
      id: 405,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/405',
      name: 'Cosmofunding Vontobel Backend',
      type: 'scrum',
    },
    {
      id: 408,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/408',
      name: 'Ecosio',
      type: 'scrum',
    },
    {
      id: 409,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/409',
      name: 'Team Z',
      type: 'scrum',
    },
    {
      id: 412,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/412',
      name: 'Creative-Template',
      type: 'scrum',
    },
    {
      id: 413,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/413',
      name: 'Kopie von Creative-Template',
      type: 'scrum',
    },
    {
      id: 417,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/417',
      name: 'Clemens Overview',
      type: 'scrum',
    },
    {
      id: 418,
      self: 'https://jira.towa-digital.com/rest/agile/1.0/board/418',
      name: 'Team-W Sprint Backlog',
      type: 'scrum',
    },
  ],
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;

  padding: 15px;
`;

const GridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  padding: 20px 40px;
  height: 100px;

  background-color: ${({ theme }) => theme.colors.navBackground};
`;

const Boards = () => {
  const [favouriteBoards, addFavouriteBoard] = useState([]);

  return (
    <Grid>
      {boards.values.map(board => (
        <GridItem
          key={board.id}
          onClick={() => addFavouriteBoard([...favouriteBoards, board])}
        >
          {board.name}
        </GridItem>
      ))}
    </Grid>
  );
};

export default Boards;
