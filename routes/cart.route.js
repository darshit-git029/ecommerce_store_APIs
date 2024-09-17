const express = require('express')
const cartRouter = express.Router()

//import controller from user.controller, login.controller and user.validation file 
const { authenticateToken } = require('../controllers/login.controller.js');
const { getcartData, getcartitemData, getcartitemDataById, insertcartitem, insertcartdata, updatecartItemData, deleteCartItem, deleteCart } = require('../controllers/cart.controller.js');

//cart
cartRouter.get('/cart', authenticateToken, getcartData)

cartRouter.post('/cart/add', authenticateToken, insertcartdata)

cartRouter.delete('/cart/delete/:id',authenticateToken,deleteCart)

//cart item
cartRouter.get('/cartitem', authenticateToken, getcartitemData)

cartRouter.get('/cartitem/id/:id', authenticateToken, getcartitemDataById)

cartRouter.post('/cartitem/add', authenticateToken, insertcartitem)

cartRouter.put('/cartitem/update/:id', authenticateToken, updatecartItemData)

cartRouter.delete('/cartitem/delete/:id', authenticateToken,deleteCartItem)
//export product router
module.exports = cartRouter;