export const requireAuth = (req, res, next) => {
  if (req.session?.user) return next();
  req.session.returnTo = req.originalUrl;
  return res.redirect('/login');
};

export const exposeSession = (req, res, next) => {
  res.locals.user = req.session?.user || null;
  res.locals.message = req.session?.message || null;
  res.locals.lastVisit = req.lastVisit || null;
  if (req.session) delete req.session.message;
  next();
};
