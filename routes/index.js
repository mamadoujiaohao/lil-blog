const express = require('express')
const router = express.Router()
const about = require('./modules/about')

router.get('/', (req, res) => res.render('../views/blog'))
router.use('/about', about)
module.exports = router
