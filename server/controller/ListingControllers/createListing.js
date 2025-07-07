{/* 1. name 2. description 3.address 4. regular price,  5. bedrooms, furnished, parking, type, offer, imageiurls, userefs  */}

import Listing from "../../models/listingModels.js";

export const createListing = async(req,res)=>{
    try{
        const listing = await Listing.create(req.body);
        return res.json(listing);
    }catch(err){
        res.json({success:true, message: err.message});
    }
}