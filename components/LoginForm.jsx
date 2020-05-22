import { useState } from 'react';
import useSWR from 'swr';
import Router from 'next/router';
import Spinner from './Spinner';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, error, isValidating } = useSWR(
    shouldFetch ? '/api/login' : null,
    url =>
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      }).then(res => {
        if (res.status === 200) {
          return res.json();
        }
        // TODO: improve error messages
        throw new Error(`HTTP Code ${res.status} - ${res.statusText}`);
      }),
    { shouldRetryOnError: false },
  );

  if (isValidating) {
    // TODO: improve spinner
    return <Spinner />;
  }

  if (data && !error) {
    Router.push('/first-time');
  }

  // TODO: readd autocomplete before launch
  // TODO: BEWARE: wrong data 3x goto jira page !message!
  return (
    <form autoComplete="off">
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          onBlur={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onBlur={e => setPassword(e.target.value)}
        />
      </div>
      <button
        type="button"
        onClick={() => {
          setShouldFetch(true);
        }}
      >
        Login
      </button>
      {error ? <div>{error.message}</div> : null}
    </form>
  );
};

export default LoginForm;
