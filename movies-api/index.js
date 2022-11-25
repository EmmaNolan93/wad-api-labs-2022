import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import moviesRouter from './api/movies';
import usersRouter from './api/users/';
import genresRouter from './api/genres/';
import session from 'express-session';
import passport from './api/authenticate';
import './api/db';
import './api/seedData';

dotenv.config();
const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};
const app = express();

// eslint-disable-next-line no-undef
const port = process.env.PORT;
app.use(passport.initialize());
app.use(bodyParser.json());
//update /api/Movie route
app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);
app.use('/api/users', usersRouter);
app.use('/api/genres', genresRouter);
app.use(errHandler);



app.listen(port, () => {
  console.info(`Server running at ${port}`);
});