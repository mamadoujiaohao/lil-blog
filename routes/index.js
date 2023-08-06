const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')
const user = require('./modules/user')
const portfolio = require('./modules/portfolio')
const about = require('./modules/about')
const blog = require('./modules/blog')
const { generalErrorHandler } = require('../middleware/error-handler')

router.use('/admin', admin)
router.use('/user', user)
router.use('/portfolio', portfolio)
router.use('/about', about)
router.use('/blog', blog)
router.use('/', (req, res) => res.redirect('/blog')) // 暫時先引導到blog
router.use('/', generalErrorHandler)
module.exports = router
