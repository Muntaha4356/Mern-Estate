import cloudinary from "./cloudinary.js";

export const UploadImage = async(file, folder)=>{
    


    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
            resource_type: "auto",
            folder: folder
        }, async(error, result) => {
            if(error){
                return reject(error.message);
            }

            return resolve(result);
        }
    ).end(file.buffer);
    })
}