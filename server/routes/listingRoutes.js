import express from 'express'
import { createListing } from '../controller/ListingControllers/createListing.js';
import userAuth from '../middleware/userAuth.js';


const listRoutes= express.Router();


listRoutes.post('/create', userAuth, createListing)

export default listRoutes;