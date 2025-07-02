import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { getUserData, upDateUser } from '../controller/useInfoController.js';
import { updateUserData } from '../controller/UserController/updateUserInfo.js';
import upload from '../utils/multer.js';


const userRoutes= express.Router();

userRoutes.get('/data', userAuth, getUserData)
userRoutes.put('/updateUser',userAuth, upload.single('profilepic'), upDateUser)



export default userRoutes;
