import { UploadImage } from "../lib/upload-image.js";
import Listing from "../models/listingModels.js";
export const uploadListImages = async(req, res) => {
    try{
        const image = req.file;
        console.log(req.body);
        const {listId} = req.body;
        console.log(listId);
        console.log("passd")
        if(!image || !listId){
            return res.status(400).json({ success: false, message: "No image uploaded or ListId not availabe" });
        }
        if(image){

            const uploadResult = await UploadImage(image, "Upload-Image");
            
            console.log("Image Result:", uploadResult)


            const list = await Listing.findById(listId);

            if(!list){
                return res.status(404).json({success: false, message: "User Not Found"})
            }
            list.imageUrls.push(uploadResult.secure_url);
            await list.save();
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