const sessionData = (req, res, key, redirect = true) => {
  const data = req.session.get(key);

  if (!data && redirect) {
    // todo add something to display a "401 unauthenticated" message/toast after redirect
    res.setHeader('location', '/');
    res.statusCode = 302;
    // getServerSideProps expects an object of props
    // but we can bypass that with the use of rerouting
    return false;
  }

  return data || {};
};

export default sessionData;
