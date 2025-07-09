import Listing from "../../models/listingModels.js";

export const showListing = async(req,res)=>{
    console.log("enetetrete344")
    try{
        console.log("enetetrete")
        const userId = req.body.userId ;
        console.log(userId)
        if (!userId) {
            return res.json({ success: false, message: "User ID is required" });
        }
        const listings = await Listing.find({ userRef: userId });
        
        console.log(listings);
        return res.json({ success: true, listings });
    }catch(err){
        
        res.json({success:false, message: err.message});
    }
}