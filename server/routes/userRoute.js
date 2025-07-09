import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { getUserData, upDateUser } from '../controller/useInfoController.js';
import { updateUserData } from '../controller/UserController/updateUserInfo.js';
import upload from '../utils/multer.js';
import { imageUpload } from '../controller/uploadImage.js';
import userAuth2 from '../middleware/useAuth2.js';
import { deleteContoller } from '../controller/deleteController.js';


const userRoutes= express.Router();

userRoutes.get('/data', userAuth, getUserData)
userRoutes.put('/updateUser', upDateUser)
userRoutes.post('/upload-image',userAuth, upload.single('image'), imageUpload)
userRoutes.put('/delete', userAuth, deleteContoller)

export default userRoutes;
