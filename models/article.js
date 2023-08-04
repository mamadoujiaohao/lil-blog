'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Article.belongsTo(models.Admin, { foreignKey: 'AdminId' })
      Article.hasMany(models.ArticleTag, { foreignKey: 'ArticleId' })
    }
  }
  Article.init({
    title: DataTypes.STRING,
    text: DataTypes.TEXT,
    pic: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Article'
  })
  return Article
}
