'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ArticleTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      ArticleTag.belongsTo(models.Article, { foreignKey: 'ArticleId' })
      ArticleTag.belongsTo(models.Tag, { foreignKey: 'TagId' })
    }
  }
  ArticleTag.init({
    ArticleId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ArticleTag'
  })
  return ArticleTag
}
