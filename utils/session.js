// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession } from 'next-iron-session';

export default function withSession(handler) {
  return withIronSession(handler, {
    // TODO: use .env file
    // password: process.env.SECRET_COOKIE_PASSWORD,
    password: '6gRui8ZMaMva4qnsfbUMLi9HumX7nUoL91aBr7AG',
    cookieName: 'SESSION_ID',
    cookieOptions: {
      // the next line allows to use the session in non-https environements like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
  });
}
