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
                method:'GET',
                credentials:'include'
            });
            const data = await res.json();

            if(data.success){
                console.log("✅ Listings found:", data.listings);
                for(let i=0; i<data.listings.length; i++){
                  console.log(data.listings[i].imageUrls[0]);
                  console.log("weee")
                }
                setListing(data.listings);
            } else {
                console.error("No listings:", data.message);
                alert("No listings:", data.message)
            }
            }catch (err) {
                console.error("Error fetching listings:", err);
            }
            
            
        }
        fetchListing();
    },[currentUser._id])
  return (
    <div className="max-w-3xl mx-auto space-y-4 p-4">
      <h2 className="text-xl font-bold">Your Listings</h2>

      {listing.length === 0 ? (
        <p>No listings available.</p>
      ) : (
        listing.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border p-3 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.imageUrls?.[0] || 'https://via.placeholder.com/100'}
                alt={item.name}
                className="w-24 h-16 object-cover rounded-md"
              />
              <span className="font-medium text-gray-800">{item.name}</span>
            </div>

            <div className="flex gap-4">
              <button className="text-green-600 font-semibold hover:underline">
                EDIT
              </button>
              <button className="text-red-600 font-semibold hover:underline">
                DELETE
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default ListingCards
