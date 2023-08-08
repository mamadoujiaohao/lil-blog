const { Work } = require('../models')

const portfolioController = {
  getPortfolio: async (req, res, next) => {
    try {
      const works = await Work.findAll()
      await res.render('../views/portfolio/portfolio', { work: works })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = portfolioController
