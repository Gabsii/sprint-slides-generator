const api = async (apiUrl, ...params) => {
  let url = apiUrl;
  let error;
  let data;
  if (apiUrl.startsWith('/')) {
    url = `${
      process.env.APP_URL !== '' || process.env.APP_URL !== undefined
        ? process.env.APP_URL
        : process.env.VERCEL_URL
    }/api${apiUrl}`;
    console.log(url);
  }
  const apiResponse = await fetch(url, ...params);

  try {
    data = await apiResponse.json();
  } catch (err) {
    console.error(err);
    error = [err.message || err];
  }

  return [data, error];
};

export default api;
