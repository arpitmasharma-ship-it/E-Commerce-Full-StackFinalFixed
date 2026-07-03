import express from "express";
import {loginUser , registerUser , adminLogin} from '../controllers/userController.js'


const userRouter = express.Router(); /////////////  It will create a new Router 

/// using above router will we create the Get Or Post Method 

userRouter.post('/register' , registerUser) ; //// we will we go to '/register' it will call registerUser
userRouter.post('/login' , loginUser) ; //// we will we go to '/login' it will call loginUser
userRouter.post('/admin' , adminLogin) ; //// we will we go to '/admin' it will call adminLogin


export default userRouter
 //// using these Router Will Create the endpoints okey using these routers we will create the end point 