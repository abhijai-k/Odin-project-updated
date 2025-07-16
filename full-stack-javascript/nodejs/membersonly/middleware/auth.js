// middleware/auth.js
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

function ensureMember(req, res, next) {
  if (req.isAuthenticated() && req.user.membership_status) return next();
  res.redirect('/join');
}

function ensureAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.admin) return next();
  res.redirect('/');
}

module.exports = {
  ensureAuthenticated,
  ensureMember,
  ensureAdmin
};
