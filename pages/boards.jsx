import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import withSession from '@utils/session';
import sessionData from '../utils/session/data';
import api from '../utils/api';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;

  padding: 15px;
`;

const GridItem = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  height: 100px;
  padding: 20px 40px;
  border: 0;
  outline: none;

  background-color: ${({ theme, isFavourited }) =>
    isFavourited ? 'green' : theme.colors.navBackground};

  &:hover {
    cursor: pointer;
  }
`;

const Boards = ({ boards, user, authToken, favourites, errors }) => {
  const [favouriteBoards, addFavouriteBoard] = useState(favourites);
  const [projectBoards, setProjectBoards] = useState(null);
  const [search, setSearch] = useState('');

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
    const res = await fetch(`api/boards`, {
      method: 'POST',
      body: JSON.stringify({ authToken, showMore: true, search }),
    })
      .then(res => res.json())
      .catch(err => console.error(err));

    const boardsResponse = res.filter(res => !res.name.includes('Team'));

    setProjectBoards(boardsResponse);
  };

  return (
    <>
      <Grid>
        {boards.map(board => (
          <GridItem
            key={board.id}
            isFavourited={favouriteBoards.some(fav => fav.id === board.id)}
            onClick={() => toggleFavourite(board)}
          >
            {board.name}
            <a
              href={
                board.jira_url ||
                `https://jira.towa-digital.com/secure/RapidBoard.jspa?rapidView=${board.id}`
              }
              target="_blank"
            >
              (Jira)
            </a>
          </GridItem>
        ))}
      </Grid>
      <hr />
      <h2>Need to see more?</h2>
      <button onClick={() => loadAll()}>Show More</button>
      {projectBoards && (
        <input
          type="text"
          name="search"
          id="search"
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => (e.key === 'Enter' ? loadAll() : null)}
          onBlur={() => loadAll()}
        />
      )}
      <Grid>
        {projectBoards &&
          projectBoards.map(board => (
            <GridItem
              key={board.id}
              isFavourited={favouriteBoards.some(fav => fav.id === board.id)}
              onClick={() => toggleFavourite(board)}
            >
              {board.name}
              <a
                href={
                  board.jira_url ||
                  `https://jira.towa-digital.com/secure/RapidBoard.jspa?rapidView=${board.id}`
                }
                target="_blank"
              >
                (Jira)
              </a>
            </GridItem>
          ))}
      </Grid>
    </>
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

Boards.propTypes = {
  boards: PropTypes.array,
  user: PropTypes.array,
  favourites: PropTypes.array,
  authToken: PropTypes.string,
  errors: PropTypes.array,
};
