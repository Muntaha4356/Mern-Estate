import express from 'express'
import { createListing } from '../controller/ListingControllers/createListing.js';
import userAuth from '../middleware/userAuth.js';
import { uploadListImages } from '../controller/uploadListImages.js';
import upload from '../utils/multer.js';
import { showListing } from '../controller/ListingControllers/showListingController.js';
import { deleteListController } from '../controller/ListingControllers/deleteListingController.js';
import { editListing } from '../controller/ListingControllers/editListing.js';
import { getListInfo } from '../controller/ListingControllers/getListInfo.js';
import { getOwnerInfo } from '../controller/ListingControllers/getOwnerInfo.js';
import { getListings } from '../controller/ListingControllers/GetMultipleListing.js';
import { getAllListing } from '../controller/ListingControllers/getAllListings.js';

const listRoutes= express.Router();


listRoutes.post('/create', createListing);
listRoutes.post('/uploadlistimage',upload.single('image'), uploadListImages)
listRoutes.get('/showlist',userAuth,showListing)
listRoutes.put('/delete', deleteListController)
listRoutes.get('/get/:id', getListInfo)
listRoutes.put('/edit/:id', userAuth, editListing)
listRoutes.post('/getowner', getOwnerInfo)
listRoutes.get('/search',getListings)
listRoutes.get('/getAll', getAllListing)
export default listRoutes;