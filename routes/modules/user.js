const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user-controller')
const passport = require('../../config/passport')

router.get('/signup', userController.getSignUp)
router.post('/signup', userController.postSignUp)
router.get('/login', userController.getLogin)
router.post('/login', passport.authenticate('local', { failureRedirect: '/user/login', failureFlash: true }), userController.postLogin)
router.get('/logout', userController.logout)

module.exports = router
