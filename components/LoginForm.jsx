import base64 from 'base-64';
import { useState } from 'react';
// import Router from 'next/router';

function login(username, password) {
  console.log({ password, username });

  const authToken = base64.encode(`${username}:${password}`);

  // TODO: figure out CORS issues

  fetch('https://jira.towa-digital.com/rest/api/2/myself', {
    headers: {
      Authentication: `Basic ${authToken}`,
    },
  })
    .then(res => {
      console.log(res);
      return res.json();
    })
    .catch(e => e.statusCode);

  // if (username.firstTime) {
  //   Router.push('/boards');
  // } else {
  //   Router.push('/dashboard');
  // }
}

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // TODO: readd autocomplete before launch
  return (
    <form autoComplete="off">
      <div>
        <label htmlFor="checkbox">Bitbucket Server</label>
        <input type="checkbox" name="checkbox" />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button type="button" onClick={() => login(username, password)}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
