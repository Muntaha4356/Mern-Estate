import { UploadImage } from "../lib/upload-image";
import Listing from "../models/listingModels.js";
export const uploadListImages = async(req, res) => {
    try{
        const image = req.file;
        if(!image){
            return res.status(400).json({ success: false, message: "No image uploaded" });
        }
        if(image){
            const uploadResult = await UploadImage(image, "Upload-Image");
            console.log("Image Result:", uploadResult)


            const list = await Listing.findById(req.user._id);

            if(!list){
                return res.status(404).json({success: false, message: "User Not Found"})
            }
            list.imageUrls.push(uploadResult.secure_url);
            await user.save();
            return res.status(200).json({
                success: true,
                url: uploadResult.secure_url,
                message: "Image uploaded and saved to user profile"
            })

        }
    }catch(error){
        console.error("Upload error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}