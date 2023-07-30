if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')

const port = process.env.PORT || 3000
const routes = require('./routes')
const { engine } = require('express-handlebars')

const app = express()

app.engine('hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.urlencoded({ extened: true }))
app.use(express.json())
app.use(routes)

app.listen(port, () => console.log(`App listening on port ${port}!`))
module.exports = app
