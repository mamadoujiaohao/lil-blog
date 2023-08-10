const { Work } = require('../models')
const { getUser } = require('../helpers/auth-helpers')
const { imgurFileHandler } = require('../helpers/file-helpers')

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
      const { title, text, href } = req.body
      const UserId = getUser(req).id
      const pic = req.file
      if (!title) throw new Error('Please enter title')
      const imgurFile = pic ? await imgurFileHandler(pic) : null
      await Work.create({
        title,
        text,
        href,
        pic: imgurFile,
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
      if (!work) throw new Error("Work didn't exist!")
      await work.destroy()
      req.flash('success_messages', 'Work deleted successfully')
      res.redirect('/portfolio')
    } catch (err) {
      next(err)
    }
  },
  editWork: async (req, res, next) => {
    try {
      const work = await Work.findByPk(req.params.id,
        { raw: true }
      )
      if (!work) throw new Error("Work didn't exist!")
      res.render('../views/portfolio/edit-work', { work }) // 目前拿出來的work.text, 內容如果有換行的話, 出現在textarea的 default value 會在行前自動多加2格, 不知道怎麼處理
    } catch (err) {
      next(err)
    }
  },
  putWork: async (req, res, next) => {
    try {
      const { title, text, href } = req.body
      const pic = req.file // 圖片檔的位置在req.file裡, 可以console.log(req)去找 (找好久)
      console.log(pic)
      if (!title) throw new Error('Please enter title')
      const imgurFile = pic ? await imgurFileHandler(pic) : null
      console.log(imgurFile)
      const work = await Work.findByPk(req.params.id)
      if (!work) throw new Error("Work didn't exist!")
      await work.update({
        title,
        text: text.trim(),
        href,
        pic: imgurFile || work.pic
      })
      req.flash('success_messages', 'Work edited successfully')
      res.redirect('/portfolio')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = portfolioController
