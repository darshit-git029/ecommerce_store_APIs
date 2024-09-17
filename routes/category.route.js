const express = require('express')
const categoryRouter = express.Router()

//import controller from category.controller file 
const { getcategoryData, insertCategoryData, deleteCategoryData, getcategoryDataById, updateCategoryData} = require("../controllers/category.controller.js");

// Define category route
categoryRouter.get('/category', getcategoryData);

categoryRouter.post('/category',insertCategoryData)

categoryRouter.delete('/category/id/:id', deleteCategoryData)

categoryRouter.get('/category/id/:id',getcategoryDataById,)

categoryRouter.put('/category/id/:id',updateCategoryData)

//export category routes
module.exports = categoryRouter;
