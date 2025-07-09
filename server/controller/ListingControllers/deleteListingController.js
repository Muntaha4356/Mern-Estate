export const deleteListController =async (req,res) => {
    //get the id of the list...
    const {listId} = req.body;
    console.log(req.body);
    try{
        if(!listId){
            return res.json({success: false, message: "ListId not provided to the server"})
        }
        const deletedListing = await Listing.findByIdAndDelete(listId);
        if(!deletedListing){
            return res.json({success: false, message: "List not found in database"})
        }
        res.json({success:true, message: "Listing deleted"})
    }catch(error){
        console.log(error);
        res.json({success: true, message: error.message})
    }
}