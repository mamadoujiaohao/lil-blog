const express = require('express')
const router = express.Router()
const portfolioController = require('../../controllers/portfolio-controller')
const { authenticatedAdmin } = require('../../middleware/auth')
const upload = require('../../middleware/multer')

router.get('/create', authenticatedAdmin, portfolioController.createWork)
router.get('/:id/edit', authenticatedAdmin, portfolioController.editWork)
router.put('/:id', upload.single('pic'), authenticatedAdmin, portfolioController.putWork)
router.delete('/:id', authenticatedAdmin, portfolioController.deleteWork)
router.get('/', portfolioController.getPortfolio)
router.post('/', upload.single('pic'), authenticatedAdmin, portfolioController.postWork)

module.exports = router
