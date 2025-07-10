import Listing from "../../models/listingModels.js";
import userModel from "../../models/usersmodel.js"
export const getOwnerInfo = async(req,res)=>{
    try{
        const { userId } = req.body;
        if(!userId){
            return res.json({ success: false, message: "User ID is required" });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "Landlord not found" });
        }

        return res.json({
            success: true,
            userData: {
                name: user.name,
                email: user.email,
            },
        });


    }catch (error) {
        console.error("Error in getOwnerInfo:", error.message);
        return res.json({ success: false, message: "Server Error" });
    }
}

