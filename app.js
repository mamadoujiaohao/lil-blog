if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const hbs = require('express-handlebars')
const routes = require('./routes')

const handlebarsHelpers = require('./helpers/handlebars-helpers')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport')
const { getUser } = require('./helpers/auth-helpers')
const methodOverride = require('method-override') // for RESTful API

app.engine('hbs', hbs.engine({ extname: '.hbs', defaultLayout: 'main', helpers: handlebarsHelpers }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extened: true }))
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(methodOverride('_method'))

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = getUser(req)
  next()
})
app.use(express.json())
app.use(routes)

app.listen(port, () => console.log(`App listening on port ${port}!`))
module.exports = app
