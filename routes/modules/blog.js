const express = require('express')
const router = express.Router()
const blogController = require('../../controllers/blog-controller')

router.get('/', blogController.getBlog)
router.get('/:id', blogController.getArticle)

module.exports = router
