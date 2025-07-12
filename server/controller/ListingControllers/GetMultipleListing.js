import Listing from "../../models/listingModels.js";


export const getListings = async(req, res) => {
    try{
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer ;

        if(offer === false || offer === undefined){
            offer= { $in: [false,true] } //This matches documents where offer is equal to any of the values in the array. 
        }


        let furnished = req.query.furnished;
        if (furnished === undefined || furnished === 'false'){
            furnished ={ $in: [false,true]}
        }


        let parking = req.query.parking;
        if (parking === undefined || parking === 'false'){
            parking = {$in : [false, true] }
        }


        let type = req.query.type;
        if(type === undefined || type=== 'all'){
            type = {$in : ['sale', 'rent']}
        }

        const searchTerm = req.query.searchTerm || '';

        const sort = req.query.sort || 'careatedAt';

        const order = req.query.order || 'desc';

        const listings = await Listing.find({
            name : {$regex: searchTerm, $options: 'i'} ,//regex serch in title and option i makes sure
            offer, 
            furnished,
            parking,
            type
        }).sort({[sort]: order}) //sort wrt createdAt and descending
        .limit(limit)//;


        return res.json(listings)


    }catch(error){
        res.json({success: false, message: error.message})
    }
}