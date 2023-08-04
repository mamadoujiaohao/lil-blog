const { Work } = require('../models')

const portfolioController = {
  getPortfolio: async (req, res, next) => {
    try {
      await res.render('../views/portfolio/portfolio')
    } catch {

    }
  }
}

module.exports = portfolioController
