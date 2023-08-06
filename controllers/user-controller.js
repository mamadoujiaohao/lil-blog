const { User } = require('../models')
const bcrypt = require('bcryptjs')
const db = require('../models')

const userController = {
  getSignUp: async (req, res, next) => {
    try {
      await res.render('../views/user/signUp')
    } catch (err) {
      next(err)
    }
  },
  postSignUp: async (req, res, next) => {
    try {
      const { name, email, password, passwordCheck } = req.body
      if (!name || !email || !password || !passwordCheck) throw new Error('所有欄位皆為必填!')
      if (name.length > 50) throw new Error('名稱不可大於50字元!')
      const userEmail = await User.findOne({ where: { email } })
      if (userEmail) throw new Error('email 已重複註冊！')
      if (password !== passwordCheck) throw new Error('密碼與確認密碼不相符!')
      const hash = await bcrypt.hash(password, 10)
      await User.create({
        email,
        password: hash,
        name,
        avatar: 'https://i.imgur.com/NUfWDow.png'
      })
      req.flash('success_messages', '成功註冊帳號！')
      res.redirect('/login')
    } catch (err) {
      next(err)
    }
  },
  getLogin: async (req, res, next) => {
    try {
      await res.render('../views/user/login')
    } catch {

    }
  },
  postLogout: async (req, res, next) => {
    try {

    } catch {

    }
  }
}

module.exports = userController
