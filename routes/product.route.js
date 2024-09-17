const express = require('express')
const productRouter = express.Router()
const multer = require('multer');
const { storage, fileFilter } = require("../utils/multer.js");

//import controller from product.controller file 
const { getProductData, getProductDataById, getProductDataSort, getProductDataLimit, insertProductData, deleteProductDataById, updateProductDataById } = require("../controllers/product.controller.js");
const productValidation = require('../validation/product.validate.js');

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1 * 1024 * 1024, files: 1 },
});

// Define Products route
productRouter.get('/products', getProductData);

productRouter.get("/products/limit/:no", getProductDataLimit)

productRouter.get("/products/sort/:value", getProductDataSort)

productRouter.get('/products/id/:id', getProductDataById);

productRouter.get('limit/:no/sort/:value', getProductDataLimit, getProductDataSort)

productRouter.post('/products', upload.single("image"), productValidation, insertProductData);

productRouter.put('/products/id/:id', updateProductDataById);

productRouter.delete('/products/id/:id', deleteProductDataById);

//export product router
module.exports = productRouter;