const { admin } = require('../models')

const adminController = {
  getLogin: async (req, res, next) => {
    try {
      await res.render('../views/admin/login')
    } catch {

    }
  },
  postLogin: async (req, res, next) => {
    try {
    } catch {
    }
  }
}

module.exports = adminController
