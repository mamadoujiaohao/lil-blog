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
      articles = articles.map(a => a.get({ plain: true}))
      const dataPath = articles // 要加?確認該參數是否存在,否則會出錯(propertys of undefined)
      articles = await Promise.all (articles?.map(article => {
        return {
          id: article.id,
          title: article.title,
          text: article.text,
          pic: article.pic,
          tag: article.ArticleTags[0]?.Tag?.name,
          UserId: article.UserId,
          createdAt: article.createdAt,
          updatedAt: new Date(article.updatedAt).toISOString().split('T')[0].replace(/-/g, '/'),
          userId: article.User.id,
          userName: article.User.name
        }
      }))
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
      const dataPath = articles?.dataValues // 要加?確認該參數是否存在,否則會出錯(propertys of undefined)
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
      res.render('../views/blog/article', { article: articles })
    } catch (err) {
      next(err)
    }
  },
  createArticle: async (req, res, next) => {
    try {
      res.render('../views/blog/create-article')
    } catch (err) {
      next(err)
    }
  },
  postArticle: async (req, res, next) => {
    try {
      let { title, text, tag } = req.body
      const UserId = getUser(req).id
      const pic = req.file
      if (!title) throw new Error('Please enter title')
      if (!tag) throw new Error('Please enter tag')
      const imgurFile = pic ? await imgurFileHandler(pic) : null
      await Article.create({
        title,
        text,
        pic: imgurFile,
        UserId
      })
      await Tag.findOrCreate({ where: {name: tag}})
      const articleInDB = await Article.findOne({
        raw: true,
        where: {
          title: title
        },
        order:[['createdAt', 'DESC']]
      })
      const tagInDB = await Tag.findOne({ 
        raw: true,
        where: {name: tag}
      })
      await ArticleTag.create({
        ArticleId: articleInDB.id,
        TagId: tagInDB.id
      })
      req.flash('success_messages', 'New article created successfully')
      res.redirect('/blog')
    } catch (err) {
      next(err)
    }
  },
  editArticle: async (req, res, next) => {
    try {
      const article = await Article.findByPk(req.params.id,
        { raw: true }
      )
      const articleTag = await ArticleTag.findOne({
        where:{ArticleId: req.params.id}
      })
      const tag = await Tag.findByPk(articleTag?.dataValues?.TagId,{raw: true})
      console.log(articleTag.dataValues)
      console.log()
      // 藥用article去找到tag name, 然後回傳到前端!!
      if (!article) throw new Error("article didn't exist!")
      res.render('../views/blog/edit-article', { article, tag })
      
    } catch (err) {
      next(err)
    }
  },
  putArticle: async (req, res, next) => {
    try {
      let { title, text, tag } = req.body
      const UserId = getUser(req).id
      const pic = req.file
      if (!title) throw new Error('Please enter title')
      if (!tag) throw new Error('Please enter tag')
      const imgurFile = pic ? await imgurFileHandler(pic) : null
      const article = await Article.findByPk(req.params.id)
      await article.update({
        title,
        text,
        pic: imgurFile,
        UserId
      })
      await Tag.findOrCreate({ where: {name: tag}})
      const tagInDB = await Tag.findOne({ 
        raw: true,
        where: {name: tag}
      })
      let articleTag = await ArticleTag.findOne({
        where: {
          ArticleId: req.params.id
        },
      })
      await articleTag.update({
        TagId: tagInDB?.id
      })
      req.flash('success_messages', 'Article edited successfully')
      res.redirect('/blog')
    } catch (err) {
      next(err)
    }
  },
  deleteArticle: async (req, res, next) => {
    try {
      const article = await Article.findByPk(req.params.id)
      if (!article) throw new Error("Article didn't exist!")
      const articleTag = await ArticleTag.findOne({
        where: {ArticleId: req.params.id}
      })
      await article.destroy()
      await articleTag.destroy()
      req.flash('success_messages', 'Article deleted successfully')
      res.redirect('/blog')
    } catch (err) {
      next(err)
    }
  },
}

module.exports = blogController
