export const trackLastVisit = (req, res, next) => {
  const previousVisit = req.cookies?.lastVisit;
  req.lastVisit = previousVisit ? new Date(previousVisit) : null;
  res.cookie('lastVisit', new Date().toISOString(), {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  next();
};
