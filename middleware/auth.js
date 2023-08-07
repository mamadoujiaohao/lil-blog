const { ensureAuthenticated, getUser } = require('../helpers/auth-helpers')

const authenticated = (req, res, next) => {
  if (ensureAuthenticated(req)) {
    return next()
  }
  req.flash('error_messages', '您沒有權限')
}

const authenticatedAdmin = (req, res, next) => {
  if (ensureAuthenticated(req)) {
    if (getUser(req).isAdmin) return next()
  }
  req.flash('error_messages', '您沒有權限')
}

module.exports = {
  authenticated,
  authenticatedAdmin
}
