const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.get('/login', adminController.getLogin)
router.post('/login', adminController.postLogin)

module.exports = router
