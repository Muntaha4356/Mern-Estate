import Listing from "../../models/listingModels.js";
import {v2 as cloudinary} from 'cloudinary'
export const deleteListController =async (req,res) => {
    //get the id of the list...
    const {listId} = req.body;
    try{
        
        if(!listId){
            return res.json({success: false, message: "ListId not provided to the server"})
        }
        const list = await Listing.findById(listId);
        if (!list) {
            return res.json({ success: false, message: "Listing not found" });
        }
        for (const image of list.imageUrls) {
            if (image.public_id) {
                try {
                await cloudinary.uploader.destroy(image.public_id);
                } catch (cloudErr) {
                console.error(`Error deleting image from Cloudinary: ${image.public_id}`, cloudErr);
                }
            }
        }
        const deletedListing = await Listing.findByIdAndDelete(listId);
        if(!deletedListing){
            return res.json({success: false, message: "List not found in database"})
        }
        res.json({success:true, message: "Listing deleted"})
    }catch(error){
        console.log(error);
        res.json({success: true, message: error.message})
    }
}