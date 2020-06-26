import useSWR from 'swr';
import { Router } from 'next/router';
import { useState } from 'react';

// TODO: implement login as hook

export const useLogin = (username, password, shouldFetch) => {
  const [refetch, setRefetch] = useState(true);

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
        setRefetch(false);
        // TODO: improve error messages
        throw new Error(`HTTP Code ${res.status} - ${res.statusText}`);
      }),
    { shouldRetryOnError: false },
  );

  if (data && !error) {
    Router.push('/dashboard');
  }

  return {
    data,
    error,
    isValidating,
    refetch,
  };
};
