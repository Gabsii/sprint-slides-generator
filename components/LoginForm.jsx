import { useState } from 'react';
import useSWR from 'swr';
import Router from 'next/router';
import styled from 'styled-components';

import Spinner from '@components/Spinner';
import Button from '@components/Atoms/Button';

const SpinnerWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  background-color: white;

  padding: 2rem;
  border-radius: 0.5rem;

  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);

  @media ${({ theme }) => theme.breakpoints.laptop} {
    max-width: 700px;
    margin: 0 auto;
    padding: 2rem 3rem;
  }
`;

const InputWrapper = styled.div`
  width: 100%;

  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(4, 1fr);

  padding-bottom: 1rem;
  border-bottom: 1px solid lightgray;
  margin-bottom: 2.5rem;

  &:first-of-type {
    margin-top: 2rem;
  }

  &:last-of-type {
    margin-bottom: 2rem;
  }

  @media ${({ theme }) => theme.breakpoints.laptop} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Input = styled.input`
  grid-column: span 3 / span 3;

  font-size: 0.9rem;

  padding: 0.5rem 0.75rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;

  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);
    border-color: #a4cafe;
  }
`;

const Label = styled.label`
  font-size: 1.1rem;
  font-weight: bold;
`;

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
        if (res.ok) {
          return res.json();
        }
        setShouldFetch(false);
        // TODO: improve error messages
        throw new Error(`HTTP Code ${res.status} - ${res.statusText}`);
      }),
    { shouldRetryOnError: false },
  );

  if (data && !error) {
    Router.push('/dashboard');
  }

  // TODO: readd autocomplete before launch
  // TODO: BEWARE: wrong data 3x goto jira page !message!
  return (
    <Form autoComplete="off">
      {isValidating && !error ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : null}
      <h2>Login</h2>
      <InputWrapper>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          name="username"
          required
          onBlur={e => setUsername(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          required
          onBlur={e => setPassword(e.target.value)}
        />
      </InputWrapper>
      <Button
        type="submit"
        role="button"
        disabled={isValidating}
        onClick={() => {
          if (password && username) {
            setShouldFetch(true);
          }
        }}
      >
        login
      </Button>
      {error ? <div>{error.message}</div> : null}
    </Form>
  );
};

export default LoginForm;
