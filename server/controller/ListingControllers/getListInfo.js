import Listing from "../../models/listingModels.js";

export const getListInfo =async(req, res) =>{
    try{
        const listing = await Listing.findById(req.params.id);

        if(!listing){
            res.json({success:false, message: "Listing cannotbe found corresponding to the user"})
        }

        res.json({success: true, listing})

    }catch(error){
        console.error("Error fetching single listing:", error);
        resjson({ success: false, message: error.message });
    }
}

