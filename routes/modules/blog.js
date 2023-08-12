const express = require('express')
const router = express.Router()
const blogController = require('../../controllers/blog-controller')
const { authenticatedAdmin } = require('../../middleware/auth')
const upload = require('../../middleware/multer')

router.get('/create', authenticatedAdmin, blogController.createArticle) // Create Page
// router.get('/:id/edit', authenticatedAdmin, blogController.editArticle) // Edit Page
// router.put('/:id', upload.single('pic'), authenticatedAdmin, blogController.putArticle) // U
router.delete('/:id', authenticatedAdmin, blogController.deleteArticle) // D
router.post('/', upload.single('pic'), authenticatedAdmin, blogController.postArticle) // C
router.get('/', blogController.getBlog) // R(all)
router.get('/:id', blogController.getArticle) // R(single)

module.exports = router
