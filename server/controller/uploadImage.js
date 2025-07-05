import { UploadImage } from "../lib/upload-image.js";

//route controller post request
export const imageUpload = async(req, res) =>{
    
    console.log("entered");

    try{
        const image = req.file;
        if (!image) {
            return res.status(400).json({ success: false, message: "No image uploaded" });
        }
        if(image){
            //upload the image
            console.log("image tue")
            const uploadResult = await UploadImage(image, "Upload-Image");
            console.log("Image Result:", uploadResult)
            res.status(200).json({ success: true, url: uploadResult.secure_url });
        }

    }catch(error){
        console.error("Upload error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}