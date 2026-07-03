import * as UserModel from '../model/User.js';

export const showRegister = (_req, res) =>
  res.render('auth/register', { errors: [], values: {} });

export const register = (req, res) => {
  const user = UserModel.createUser(req.body);
  if (!user) {
    return res.status(409).render('auth/register', {
      errors: ['An account with this email already exists.'],
      values: { name: req.body.name, email: req.body.email },
    });
  }
  req.session.user = user;
  req.session.message = 'Welcome! Your recruiter account is ready.';
  return res.redirect('/jobs');
};

export const showLogin = (_req, res) =>
  res.render('auth/login', { errors: [], values: {} });

export const login = (req, res) => {
  const user = UserModel.verifyCredentials(req.body.email, req.body.password);
  if (!user) {
    return res.status(401).render('auth/login', {
      errors: ['Incorrect email or password.'],
      values: { email: req.body.email },
    });
  }
  req.session.user = user;
  req.session.message = `Welcome back, ${user.name}.`;
  const destination = req.session.returnTo || '/jobs';
  delete req.session.returnTo;
  return res.redirect(destination);
};

export const logout = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return next(error);
    res.clearCookie('easily.sid');
    return res.redirect('/');
  });
};
