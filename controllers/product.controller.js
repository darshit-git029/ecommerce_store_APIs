const db = require("../models");

//get all product data from table
exports.getProductData = async (req, res) => {
  try {
    const Products = await db.Product.findAll({
      order: [
        ['id', 'ASC'],
      ],
      include: [
        {
          model: db.categories,
          as: 'product_categorys',
          attributes: ['categorieName']
        }
      ],
    })
    return res.json({ Products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: 'error to get product data from table' });
  }
};

//get only one product data using id 
exports.getProductDataById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const Products = await db.Product.findOne({
      where: { id: [id] },
      include: [
        {
          model: db.categories,
          as: 'product_categorys',
          attributes: ['categorieName']
        }
      ]
    });

    if (!Products) {
      return res.status(500).json({ message: 'Can not find product data with this id ' });
    }
    res.status(200).json(Products);
  } catch (error) {
    return res.status(500).json({ error, message: 'error to get product data from table' });
  }
}

//update product data using id 
exports.updateProductDataById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const Products = await db.Product.update({ title: req.body.title, price: req.body.price, category: req.body.category, description: req.body.description, quantity: req.body.quantity }, {
      where: { id: id }
    })
    return res.status(200).json({ Products, message: `PRODUCT ID ${id} DATA UPDATED SUCCESSFULLY` });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error to update product data from table" });
  }
}

//delete product data using id 
exports.deleteProductDataById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const Products = await db.Product.destroy({
      where: { id: id }
    })
    if (!db.Product.id) {
      return res.status(404).json({ message: "this product id is not found!!" })
    }
    return res.status(200).json({ Products, message: `PRODUCT ID ${id} DELETE SUCCESSFULLY` });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'error to delete product data from table' });
  }
}

//get product data in limit 
exports.getProductDataLimit = async (req, res) => {
  try {
    const no = parseInt(req.params.no)
    const Products = await db.Product.findAll({
      limit: no, order: [
        ['id', 'ASC'],
      ],
      include: [
        {
          model: db.categories,
          as: "product_categorys",
          attributes: ['categorieName']
        }]
    });
    return res.status(200).json({ Products, message: `only ${no} data get from table` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: 'error to get product data from table' });
  }
};

//get product data using sorting
exports.getProductDataSort = async (req, res) => {
  try {
    const value = (req.params.value)
    const Products = await db.Product.findAll({
      order: [
        ['id', value],
      ],
      include: [
        {
          model: db.categories,
          as: "product_categorys",
          attributes: ['categorieName']

        }]
    });
    return res.status(200).json(Products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: 'error to get product data from table' });
  }
};

//insert product data in product table 
exports.insertProductData = async (req, res) => {
  try {
    const { originalFilename, path } = req.file

    const image = req.file ? ( path) : null;
    const { title, price, category, description, quantity } = req.body;

    if (!req.file || !title || !price || !category || !description || !quantity) {
      return res.status(400).json("Some parameters are missing");
    }

    let Products = await db.Product.create({ title, price, category, description, quantity, image });

    return res.status(201).json({ message: "Product data inserted successfully", Products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error inserting product data' });
  }
};



