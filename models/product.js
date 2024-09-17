'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {

        static associate(models) {
            // define association here
           
            Product.belongsTo(models.categories, { foreignKey: 'category', as: 'product_categorys', onDelete: "CASCADE", onUpdate: "CASCADE" })
            Product.hasMany(models.cartItem, {
                foreignKey: 'productID',
                as: 'products',
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            })
        }
    }
    Product.init({
        title: DataTypes.STRING,
        price: DataTypes.FLOAT,
        category: DataTypes.STRING,
        description: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        image: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Product',
        timestamps: true,
    });
    return Product;
};