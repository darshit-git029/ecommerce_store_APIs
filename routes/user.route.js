const express = require('express')
const userRouter = express.Router()

//import controller from user.controller, login.controller and user.validation file 
const { getuserData, getuserDataById, insertUserData, updateUserData, deleteUserData, getuserDataLimit, getuserDataSorting } = require("../controllers/user.controller.js");
const userValidation = require('../validation/user.validate.js');
const { authenticateToken, getUserLogin, logout } = require('../controllers/login.controller.js');

//login and logour user

userRouter.post('/login', getUserLogin)

userRouter.get('/logout',logout)

// Define Products route
userRouter.get('/',authenticateToken,getuserData);

userRouter.get('/id/:id',authenticateToken, getuserDataById)

userRouter.post('/',userValidation, insertUserData)

userRouter.put('/update/:id',authenticateToken,userValidation,updateUserData)

userRouter.delete('/delete/:id',authenticateToken,deleteUserData)

userRouter.get('/limit/:no',authenticateToken, getuserDataLimit)

userRouter.get('/sort/:value',authenticateToken,getuserDataSorting)

//export product router
module.exports = userRouter;