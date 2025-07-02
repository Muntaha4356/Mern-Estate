import userModel from "../../models/usersmodel.js";

export const updateUserData = async (req, res)=>{
    try{
        const {userId, name, email, password, profilepic} = req.body;

        const user= await userModel.findById(userId);
        if(!user){
            return res.json({success: false, message:"User Not Found"});
        }
        if(!name || !email|| !password){
            return res.json({success: false, message: "Missing Creditionals"});

        }
        user.name= name || user.name;
        user.email= email || user.email;
        user.password=password || user.password;
        user.profilepic  = profilepic || user.profilepic;

        await user.save();
        res.json({success: true, message: "User updated successfully"});
    }catch(error){
        res.json({success: false, message: error.message});
    }
}