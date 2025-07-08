import express from 'express'
import { createListing } from '../controller/ListingControllers/createListing.js';
import userAuth from '../middleware/userAuth.js';
import { uploadListImages } from '../controller/uploadListImages.js';


const listRoutes= express.Router();


listRoutes.post('/create', userAuth, createListing);
listRoutes.post('/uploadlistimage',userAuth, uploadListImages)

export default listRoutes;