const express = require('express')
const router = express.Router()
const user = require('./modules/user')
const portfolio = require('./modules/portfolio')
const about = require('./modules/about')
const blog = require('./modules/blog')
const auth = require('./modules/auth')
const { generalErrorHandler } = require('../middleware/error-handler')

router.use('/user', user)
router.use('/portfolio', portfolio)
router.use('/about', about)
router.use('/blog', blog)
router.use('/auth', auth)
router.use('/', (req, res) => res.redirect('/blog')) // 暫時先引導到blog
router.use('/', generalErrorHandler)
module.exports = router
