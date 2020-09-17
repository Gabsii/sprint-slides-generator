import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Page,
  Grid,
  Divider,
  Text,
  Card,
  Link,
  Button,
  Input,
  Spacer,
  Spinner,
} from '@zeit-ui/react';
import { RefreshCw } from '@zeit-ui/react-icons';
import Head from 'next/head';

import withSession from '@utils/session';
import sessionData from '@utils/session/data';
import api from '@utils/api';
import Header from '@components/Header';

const HoverableGrid = styled(Grid)`
  &:hover {
    cursor: pointer;
  }
`;

const GridItem = ({ board, favouriteBoards, toggleFavourite }) => (
  <HoverableGrid xs={8}>
    <Card
      shadow
      hoverable
      type={
        favouriteBoards.some(fav => fav.id === board.id) ? 'success' : 'default'
      }
      onClick={() => toggleFavourite(board)}
      style={{ width: '100%', height: '150px' }}
    >
      <Card.Content style={{ height: '66%' }}>
        <Text size="1.25em">{board.name}</Text>
      </Card.Content>
      <Card.Footer style={{ height: '33%' }}>
        <Link
          href={
            board.jira_url ||
            `https://jira.towa-digital.com/secure/RapidBoard.jspa?rapidView=${board.id}`
          }
          target="_blank"
          color={!favouriteBoards.some(fav => fav.id === board.id)}
          icon
        >
          Link to Jira
        </Link>
      </Card.Footer>
    </Card>
  </HoverableGrid>
);

const Boards = ({ boards, user, authToken, favourites, errors }) => {
  const [favouriteBoards, addFavouriteBoard] = useState(favourites);
  const [projectBoards, setProjectBoards] = useState(null);
  const [search, setSearch] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const toggleFavourite = board => {
    if (favouriteBoards.some(fav => fav.id === board.id)) {
      fetch(`/api/boards/${board.id}/favourite`, {
        method: 'DELETE',
        body: JSON.stringify({ user }),
      });
      const boards = favouriteBoards.filter(
        favBoard => favBoard.id !== board.id,
      );
      addFavouriteBoard(boards);
    } else {
      fetch(`/api/boards/${board.id}/favourite`, {
        method: 'PUT',
        body: JSON.stringify({ user, name: board.name }),
      });

      addFavouriteBoard([...favouriteBoards, board]);
    }
  };

  const loadAll = async () => {
    setIsFetching(true);
    const res = await fetch(`api/boards`, {
      method: 'POST',
      body: JSON.stringify({ authToken, showMore: true, search }),
    })
      .then(res => res.json())
      .catch(err => console.error(err));

    setProjectBoards(res);
    setIsFetching(false);
  };

  return (
    <Page>
      <Head>
        <title>Boards | SprintGenerator</title>
      </Head>
      <Page.Header>
        <Header user={user} />
      </Page.Header>
      <Page.Content>
        <Text h2 style={{ marginBottom: '1rem' }}>
          Recommended Boards
        </Text>
        <Grid.Container gap={2}>
          {boards.map(board => (
            <GridItem
              key={board.id}
              board={board}
              favouriteBoards={favouriteBoards}
              toggleFavourite={toggleFavourite}
            />
          ))}
        </Grid.Container>
        <Divider />
        <Text h2>Need to see more?</Text>
        <Button auto onClick={() => loadAll()} icon={<RefreshCw />}>
          Show All
        </Button>
        {projectBoards && (
          <Input
            type="text"
            name="search"
            id="search"
            onChange={e => {
              setSearch(e.target.value);
              loadAll();
            }}
            onKeyDown={e => (e.key === 'Enter' ? loadAll() : null)}
            onBlur={() => loadAll()}
            onClearClick={() => loadAll()}
            placeholder="Search for a Jira board"
            clearable
          ></Input>
        )}
        <Spacer y={2} />
        {isFetching && <Spinner />}
        <Grid.Container gap={2}>
          {projectBoards &&
            projectBoards.map(board => (
              <GridItem
                key={board.id}
                board={board}
                favouriteBoards={favouriteBoards}
                toggleFavourite={toggleFavourite}
              />
            ))}
        </Grid.Container>
      </Page.Content>
    </Page>
  );
};

export const getServerSideProps = withSession(async function({ req, res }) {
  let errors = [];
  const user = sessionData(req, res, 'user');
  const authToken = sessionData(req, res, 'authToken');

  if (!user || !authToken) return { props: null };

  const [boards, boardsError] = await api('/boards', {
    method: 'POST',
    body: JSON.stringify({ authToken }),
  });
  boardsError && errors.push(boardsError);

  const [favourites, favouritesError] = await api('/boards/favourites', {
    method: 'POST',
    body: JSON.stringify({ user }),
  });
  favouritesError && errors.push(favouritesError);

  return {
    props: {
      user: req.session.get('user'),
      authToken: req.session.get('authToken'),
      boards,
      favourites,
      errors,
    },
  };
});

export default Boards;

GridItem.propTypes = {
  board: PropTypes.object,
  favouriteBoards: PropTypes.array,
  toggleFavourite: PropTypes.func,
};

Boards.propTypes = {
  boards: PropTypes.array,
  user: PropTypes.object,
  favourites: PropTypes.array,
  authToken: PropTypes.string,
  errors: PropTypes.array,
};
