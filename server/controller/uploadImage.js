import { UploadImage } from "../lib/upload-image.js";
import userModel from '../models/usersmodel.js'
//I:\Dev WEEKEND Tasks\Task3\server\models\usersmodel.js
//route controller post request
export const imageUpload = async(req, res) =>{

    try{
        const image = req.file;
        if (!image) {
            return res.status(400).json({ success: false, message: "No image uploaded" });
        }
        if(image){
            //upload the image
            const uploadResult = await UploadImage(image, "Upload-Image");
            console.log("Image Result:", uploadResult)

            
            
            //uploading in database
            const user = await userModel.findById(req.user._id);
            
            if(!user){
                return res.status(404).json({success: false, message: "User Not Found"})
            }
            user.profilepic = uploadResult.secure_url;
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