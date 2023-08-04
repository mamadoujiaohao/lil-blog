const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')
const user = require('./modules/user')
const portfolio = require('./modules/portfolio')
const about = require('./modules/about')

router.get('/', (req, res) => res.render('../views/blog/blog'))
router.use('/admin', admin)
router.use('/user', user)
router.use('/portfolio', portfolio)
router.use('/about', about)
module.exports = router
