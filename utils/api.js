const api = async (apiUrl, ...params) => {
  let url = apiUrl;
  let error;
  let data;
  if (apiUrl.startsWith('/')) {
    url = `${
      process.env.APP_URL
        ? `http://${process.env.APP_URL}`
        : `https://${process.env.VERCEL_URL || process.env.DEPLOY_PRIME_URL}`
    }/api${apiUrl}`;
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
