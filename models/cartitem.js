'use strict';
const { mode } = require('crypto-js');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cartItem.belongsTo(models.Product, {
        foreignKey: 'productID',
        as: 'Products',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      })
      cartItem.belongsTo(models.cart, {
        foreignKey: "cartID",
        as: "cart_ID",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      })

    }
  }
  cartItem.init({
    cartID: DataTypes.INTEGER,
    productID: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cartItem',
  });
  return cartItem;
};