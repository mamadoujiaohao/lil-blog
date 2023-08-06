const { Article } = require('../models')

const blogController = {
  getBlog: async (req, res, next) => {
    try {
      await res.render('../views/blog/blog')
    } catch {

    }
  }
}

module.exports = blogController
