import Listing from "../../models/listingModels.js";
import { v2 as cloudinary } from 'cloudinary';

export const editListing = async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id);

    if (!listing) {
      return res.json({ success: false, message: "Listing not found" });
    }

    if (req.user._id.toString() !== listing.userRef.toString()) {
      return res.json({ success: false, message: "You can only edit your own listings" });
    }

    // Extract deletions and other updates
    let { toDeleteImages = [], ...otherFields } = req.body;

    if (!Array.isArray(toDeleteImages) && typeof toDeleteImages === 'object') {
        toDeleteImages = Object.values(toDeleteImages);
    }

    console.log("Sanitized toDeleteImages array:", toDeleteImages);
console.log("Type check:", Array.isArray(toDeleteImages));
    // Delete from Cloudinary
    for (const public_id of toDeleteImages) {
        console.log(typeof public_id)
        const publicId = public_id;
        console.log("Trying to delete:", public_id);
      try {
        const result = await cloudinary.uploader.destroy(public_id);
        console.log("Cloudinary response:", result);
        if (result.result === "ok") {
      // ✅ Filter out from MongoDB using full public_id
        // listing.imageUrls = listing.imageUrls.filter(
        //   (img) => img.public_id !== publicId
        // );
        for (let i=0; i<listing.imageUrls.length; i++){
          if(listing.imageUrls[i].public_id===public_id){
            const objectid= listing.imageUrls[i]._id;
            console.log(objectid);
            listing.imageUrls.pull({ _id: objectid });
          }
          
        };
       }
      } catch (err) {
        console.log("Camehere tiii");
        console.error(`Failed to delete ${publicId}`, err);
      }
    }
    // // Remove deleted images from DB
    // listing.imageUrls = listing.imageUrls.filter(
    //   (img) => !toDeleteImages.includes(img.public_id)
    // );

    // Update other listing fields
    Object.assign(listing, otherFields);

    // Save updated listing
    await listing.save();

    return res.json({ success: true, message: "Edited successfully" });

  } catch (error) {
    console.error("Edit error:", error);
    return res.json({ success: false, message: error.message });
  }
};
