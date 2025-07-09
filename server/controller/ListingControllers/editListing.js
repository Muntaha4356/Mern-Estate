import Listing from "../../models/listingModels.js";

export const editListing = async (req, res) => {
    console.log(req.params.id);
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
        return res.json({success:false, message:"Listing is not found"})
    }
    if (req.user._id.toString() !== listing.userRef.toString()) {
        return res.status(403).json({ success: false, message: "You can only edit your own listings" });
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
        );
        res.json({success:true, message: "Edited successfully"})
    } catch (error) {
        res.json({success:false, message: error.message})
    }
}