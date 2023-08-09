const express = require('express')
const router = express.Router()
const portfolioController = require('../../controllers/portfolio-controller')
const { authenticatedAdmin } = require('../../middleware/auth')

router.get('/create', authenticatedAdmin, portfolioController.createWork)
router.get('/:id/edit', authenticatedAdmin, portfolioController.editWork)
router.put('/:id', authenticatedAdmin, portfolioController.putWork)
router.delete('/:id', authenticatedAdmin, portfolioController.deleteWork)
router.get('/', portfolioController.getPortfolio)
router.post('/', authenticatedAdmin, portfolioController.postWork)

module.exports = router
