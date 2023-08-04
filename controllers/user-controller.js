const { User } = require('../models')

const userController = {
  getSignUp: async (req, res, next) => {
    try {
      await res.render('../views/user/signUp')
    } catch {

    }
  },
  getLogin: async (req, res, next) => {
    try {
      await res.render('../views/user/login')
    } catch {

    }
  },
  getAbout: async (req, res, next) => {
    try {
      await res.render('../views/user/about')
    } catch {

    }
  }
}

module.exports = userController
