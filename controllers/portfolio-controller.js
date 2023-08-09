const { Work } = require('../models')
const { getUser } = require('../helpers/auth-helpers')
const portfolioController = {
  getPortfolio: async (req, res, next) => {
    try {
      const works = await Work.findAll({
        raw: true,
        order: [['updatedAt', 'DESC']]
      })
      await res.render('../views/portfolio/portfolio', { work: works })
    } catch (err) {
      next(err)
    }
  },
  createWork: async (req, res, next) => {
    try {
      res.render('../views/portfolio/create-work')
    } catch (err) {
      next(err)
    }
  },
  postWork: async (req, res, next) => {
    try {
      const { title, text, href, pic } = req.body
      const UserId = getUser(req).id
      if (!title) throw new Error('Please enter title')
      await Work.create({
        title,
        text,
        href,
        pic,
        UserId
      })
      req.flash('success_messages', 'New work created successfully')
      res.redirect('/portfolio')
    } catch (err) {
      next(err)
    }
  },
  deleteWork: async (req, res, next) => {
    try {
      const work = await Work.findByPk(req.params.id)
      if (!work) throw new Error("Restaurant didn't exist!")
      await work.destroy()
      req.flash('success_messages', 'Work deleted successfully')
      res.redirect('/portfolio')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = portfolioController
