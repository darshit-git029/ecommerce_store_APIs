'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Category extends Model {

    static associate(models) {
      Category.hasMany(models.Product, {
        foreignKey: 'category',
        as: 'categorys_product',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
    }
  }

  Category.init({
    categorieName: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'categories',
    timestamps: false,
  });
  return Category;
};