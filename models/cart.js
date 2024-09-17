'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cart.belongsTo(models.user, { foreignKey: 'userID', as: 'user_id', onDelete: "CASCADE", onUpdate: "CASCADE" })
      cart.hasOne(models.cartItem, {
        foreignKey: "cartID",
        as: "cart_ID",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      })
    }
  }
  cart.init({
    userID: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};