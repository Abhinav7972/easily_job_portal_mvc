import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import expressLayouts from 'express-ejs-layouts';
import homeRouter from './src/routes/homeRoute.js';
import authRouter from './src/routes/authRoutes.js';
import jobRouter from './src/routes/jobRoutes.js';
import applicantRouter from './src/routes/applicantRoutes.js';
import { exposeSession } from './src/middlewares/auth.js';
import { trackLastVisit } from './src/middlewares/lastVisit.js';

const server = express();
const PORT = process.env.PORT || 3000;

server.set('views', path.resolve('src', 'views'));
server.set('view engine', 'ejs');
server.set('layout', 'layout/layout');

server.use(expressLayouts);
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser());
server.use(session({
  name: 'easily.sid',
  secret: process.env.SESSION_SECRET || 'change-this-development-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax', maxAge: 24 * 60 * 60 * 1000 },
}));
server.use(trackLastVisit);
server.use(exposeSession);
server.use(express.static(path.resolve('public')));

server.use('/', homeRouter);
server.use('/', authRouter);
server.use('/', applicantRouter);
server.use('/jobs', jobRouter);

server.use((_req, res) => res.status(404).render('errors/404'));
server.use((error, req, res, _next) => {
  console.error(error);
  if (res.locals.job && (error.name === 'MulterError' || error.message.includes('Resume'))) {
    return res.status(400).render('jobs/detail', {
      job: res.locals.job,
      applicationErrors: [error.code === 'LIMIT_FILE_SIZE' ? 'Resume must be smaller than 5 MB.' : error.message],
      applicationValues: req.body || {},
    });
  }
  return res.status(500).render('errors/500');
});

server.listen(PORT, () => console.log(`Easily is running at http://localhost:${PORT}`));
