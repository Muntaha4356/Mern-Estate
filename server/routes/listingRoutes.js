import express from 'express'
import { createListing } from '../controller/ListingControllers/createListing.js';
import userAuth from '../middleware/userAuth.js';
import { uploadListImages } from '../controller/uploadListImages.js';
import upload from '../utils/multer.js';
import { showListing } from '../controller/ListingControllers/showListingController.js';
import { deleteListController } from '../controller/ListingControllers/deleteListingController.js';

const listRoutes= express.Router();


listRoutes.post('/create', createListing);
listRoutes.post('/uploadlistimage',upload.single('image'), uploadListImages)
listRoutes.get('/showlist',userAuth,showListing)
listRoutes.put('/delete', deleteListController)
export default listRoutes;