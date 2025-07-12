import userModel from "../models/usersmodel.js";
import cloudinary from '../utils/cloudinary.js';
import axios from 'axios';
export const getUserData = async(req, res) =>{
    try{
        const {userId} = req.body;
        //finding the use
        const user = await userModel.findById(userId);

        if(!user){
            return res.json({success:false, message: "User Not Found"})
        }
        
        res.json({
            success: true,
            userData:{
                name: user.name,
                status : user.status,
                profilepic: user.profilepic,
                email: user.email

            }
        });

    }catch(error){
        res.json({success:false, message: error.message})
    }
}


export const upDateUser = async (req, res) =>{
    const {name} = req.body;

    try {
        let profilepicUrl = req.body.existingPic; // fallback

        if (req.file) {
        const uploadRes = cloudinary.uploader.upload_stream(
            {
            folder: 'user-profiles',
            public_id: `${userId}-${Date.now()}`,
            },
            async (error, result) => {
                
            if (error) {
                console.error(error);
                return res.status(500).json({ success: false, message: 'Cloudinary upload failed' });
            }

            profilepicUrl = result.secure_url;

            const updatedUser = await userModel.findByIdAndUpdate(
                userId,
                { name, profilepic: profilepicUrl },
                { new: true }
            );

            res.status(200).json({ success: true, user: updatedUser });
            }
        );

        // Pipe the file buffer  to Cloudinary
        const stream = require('stream');
        const bufferStream = new stream.PassThrough();
        bufferStream.end(req.file.buffer);
        bufferStream.pipe(uploadRes);
        } else {
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { name, profilepic: profilepicUrl },
            { new: true }
        );

        res.status(200).json({ success: true, user: updatedUser });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Update failed' });
    }
}




