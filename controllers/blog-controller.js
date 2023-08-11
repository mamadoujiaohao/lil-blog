const { Article, Tag, User, ArticleTag } = require('../models')
const { getUser } = require('../helpers/auth-helpers')
const { imgurFileHandler } = require('../helpers/file-helpers')

const blogController = {
  getBlog: async (req, res, next) => {
    try {
      let articles = await Article.findAll({
        order: [['updatedAt', 'DESC']],
        include: [
          { model: User, attributes: ['id', 'name'] },
          { model: ArticleTag, include: [{ model: Tag }] }
        ]
      })
      const dataPath = articles[0].dataValues
      articles = articles.map(article => {
        return {
          id: dataPath.id,
          title: dataPath.title,
          text: dataPath.text,
          pic: dataPath.pic,
          tag: dataPath.ArticleTags[0].Tag.dataValues.name,
          UserId: dataPath.UserId,
          createdAt: dataPath.createdAt,
          updatedAt: new Date(dataPath.updatedAt).toISOString().split('T')[0].replace(/-/g, '/'),
          userId: dataPath.User.dataValues.id,
          userName: dataPath.User.dataValues.name
        }
      })
      res.render('../views/blog/blog', { article: articles })
    } catch (err) {
      next(err)
    }
  },
  getArticle: async (req, res, next) => {
    try {
      const id = req.params.id
      let articles = await Article.findByPk(id, {
        include: [
          { model: User, attributes: ['id', 'name'] },
          { model: ArticleTag, include: [{ model: Tag }] }
        ]
      })
      const dataPath = articles.dataValues
      articles = {
        id: dataPath.id,
        title: dataPath.title,
        text: dataPath.text,
        pic: dataPath.pic,
        tag: dataPath.ArticleTags[0].Tag.dataValues.name,
        UserId: dataPath.UserId,
        createdAt: dataPath.createdAt,
        updatedAt: new Date(dataPath.updatedAt).toISOString().split('T')[0].replace(/-/g, '/'),
        userId: dataPath.User.dataValues.id,
        userName: dataPath.User.dataValues.name
      }
      console.log(articles)
      res.redirect('/about')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = blogController
