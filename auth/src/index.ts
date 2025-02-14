import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true, // Set to true in production
    httpOnly: true, // Set to true in production
  })
)

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.get('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler); // Must be the last middleware in the chain

const start = async () => {
  try {
    await mongoose.connect('mongodb:///auth-mongo-srv:27017/auth');
    console.log('Connected to the database');
  } catch (err) {
    console.error('Error connecting to the database', err);
    process.exit(1);
  }

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
};

start();