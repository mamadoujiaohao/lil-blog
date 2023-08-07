const passport = require('passport')
const LocalStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User
// set up Passport strategy
passport.use(new LocalStrategy(
  // customize user field
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  // authenticate user
  (req, email, password, cb) => {
    User.findOne({ where: { email } })
      .then(user => {
        if (!user) return cb(null, false, req.flash('error_messages', 'E-mail或密碼輸入錯誤！'))
        bcrypt.compare(password, user.password).then(res => {
          if (!res) return cb(null, false, req.flash('error_messages', 'E-mail或密碼輸入錯誤！'))
          return cb(null, user)
        })
      })
  }
))

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.callbackURL,
  profileFields: ['email', 'displayName', 'photos']
}, (accessToken, refreshToken, profile, done) => {
  const { name, email, picture } = profile._json
  User.findOne({ email })
    .then(user => {
      if (user) return done(null, user)
      const randomPassword = Math.random().toString(36).slice(-8)
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(randomPassword, salt))
        .then(hash => User.create({
          name,
          email,
          avatar: picture.data.url,
          password: hash
        }))
        .then(user => done(null, user))
        .catch(err => done(err, false))
    })
}))

// serialize and deserialize user
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  User.findByPk(id).then(user => {
    user = user.toJSON()
    return cb(null, user)
  })
})
module.exports = passport
