import userModel from "../../models/usersmodel.js";

export const updateUserData = async (req, res)=>{
    
    try{
        const { name} = req.body;
        
        console.log("USER ID from req.user: ", req.user?._id);
        console.log("req.user", req.user);
        const user= await userModel.findById(req.user._id);


        
        if(!user){
            return res.json({success: false, message:"User Not Found"});
        }
        if(!name){
            return res.json({success: false, message: "Missing Creditionals"});

        }
        user.name= name || user.name;

        await user.save();
        res.json({success: true, message: "User updated successfully"});
    }catch(error){
        res.json({success: false, message: error.message});
    }
}