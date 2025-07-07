import userModel from "../models/usersmodel.js";

export const deleteContoller = async(req, res)=>{
    try{
        const {email} = req.body;
        if(!email){
            return res.json({success:false, message:"Email is not found"});
        }
        const deleteUser= await userModel.findOneAndDelete({email});

        if(!deleteUser){
            return res.json({status:false, message:"User not found" })

        }
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'Lax',
            secure: false, // set to true in production with HTTPS
            });
        res.json({success: true, message: " User deleted"});
        
    }
    catch(err){
        return res.json({success:false, message:err.message})
    }
}