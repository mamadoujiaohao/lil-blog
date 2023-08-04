// const { User } = require('../models')

const aboutController = {
  getAbout: async (req, res, next) => {
    try {
      await res.render('../views/about/about')
    } catch {

    }
  }
}

module.exports = aboutController
