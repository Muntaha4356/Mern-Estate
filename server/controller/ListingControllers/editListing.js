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

    // Destructure deletions and other updated fields
    let { toDeleteImages = [], ...otherFields } = req.body;
    Object.assign(listing, otherFields);
    if (!Array.isArray(toDeleteImages)) {
      toDeleteImages = [];
    }

    console.log("Images to delete:", toDeleteImages);

    // Step 1: Delete images one by one
    for (const { public_id, _id } of toDeleteImages) {
      if (!public_id || !_id) continue; // skip invalid

      try {
        console.log(`Trying to delete Cloudinary image: ${public_id}`);
        const result = await cloudinary.uploader.destroy(public_id);
        console.log("Cloudinary response:", result);

        if (result.result === "ok") {
          // Pull from MongoDB by _id
          listing.imageUrls.pull({ _id });
          console.log(`Removed image with _id: ${_id} from listing`);
        }
      } catch (err) {
        console.error(`Failed to delete image ${public_id}`, err);
      }
    }

    // // Step 2: Update listing fields
    // 

    // Step 3: Save listing
    await listing.save();

    return res.json({ success: true, message: "Edited successfully" });

  } catch (error) {
    console.error("Edit error:", error);
    return res.json({ success: false, message: error.message });
  }
};

