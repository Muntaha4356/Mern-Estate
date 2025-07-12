import Listing from "../../models/listingModels.js";

export const getAllListing = async(req, res) => {
    try{
        const listings= await Listing.find();
        return res.json(listings)
    }catch(error){
        res.json({success:false, message:error.message});
    }
}
