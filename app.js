if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')

const port = process.env.PORT || 3000
const routes = require('./routes')
const hbs = require('express-handlebars')
const handlebarsHelpers = require('./helpers/handlebars-helpers')
const flash = require('connect-flash')
const session = require('express-session')
const SESSION_SECRET = process.env.SESSION_SECRET

const app = express()

app.engine('hbs', hbs.engine({ extname: '.hbs', defaultLayout: 'main', helpers: handlebarsHelpers }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.urlencoded({ extened: true }))
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  next()
})
app.use(express.json())
app.use(routes)

app.listen(port, () => console.log(`App listening on port ${port}!`))
module.exports = app
