import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';




const ListingCards = () => {

    const [listing, setListing]= useState([]);
    const currentUser = useSelector((state)=> state.user.currentUser);

    //SHOW ALLTHE LISTS
    useEffect(()=>{
        const fetchListing = async () => {
            try{
                const res= await fetch('http://localhost:3000/api/list/showlist',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();

            if(data.success){
                console.log("✅ Listings found:", data.listings);
                setListing(data.listings);
            } else {
                console.error("No listings:", data.message);
                alert("No listings:", data.message)
            }
            }catch (err) {
                console.error("Error fetching listings:", err);
            }
            
        }
    })

  return (
    <div className="flex items-center justify-between border p-3 rounded-lg shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-4">
        <img
          src={listing.imageUrls[0] || 'https://via.placeholder.com/100'}
          alt={listing.name}
          className="w-24 h-16 object-cover rounded-md"
        />
        <span className="font-medium text-gray-800">{listing.name}</span>
      </div>

      <div className="flex gap-4">
        <button
        //   onClick={() => onEdit(listing._id)}
          className="text-green-600 font-semibold hover:underline"
        >
          EDIT
        </button>
        <button
        //   onClick={() => onDelete(listing._id)}
          className="text-red-600 font-semibold hover:underline"
        >
          DELETE
        </button>
      </div>
    </div>
  )
}

export default ListingCards
