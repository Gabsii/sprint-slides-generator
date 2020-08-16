const sessionData = (req, res, key) => {
  const data = req.session.get(key);

  if (!data) {
    res.setHeader('location', '/');
    res.statusCode = 302;
    res.end();
    // getServerSideProps expects an object of props
    // but we can bypass that with the use of rerouting
    return;
  }

  return data;
};

export default sessionData;
