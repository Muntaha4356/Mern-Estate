import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  const [listings, setListings] = useState([]);
  useEffect(()=>{
    const fetchListing = async(e) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/list/getAll`);
        const data = await res.json();
        console.log(data);
        setListings(data);
      } catch (err) {
        console.error('Error fetching listings:', err);
      }
    
    }
    fetchListing();
  },[])
  return (
    <div>
      <div className="">
        <h1 className='font-extrabold text-7xl md:text-9xl'>Find Your <span className='text-slate-600'>Home </span></h1>
        
        <div className='p-3 text-slate-400 lg:w-4xl md:w-3xl'> Looking for your dream home? Whether you're buying, renting, or just browsing — we've made it simple. <p className='text-slate-600 '>Buy it. Rent it. Love it. Your next home is just a click away.</p></div>
       
      </div>
      <div className='p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
  {listings.map((listing) => (
    <div
      key={listing._id}
      className='border shadow-md m-4 rounded-lg overflow-hidden hover:shadow-lg transition'
    >
      <img
        src={listing.imageUrls[0]?.url || 'https://res.cloudinary.com/dflbje6qn/image/upload/v1752101136/Upload-Image/ygqcye90nrpfju9kyg4j.jpg'}
        alt={listing.name}
        className='h-48 w-full object-cover'
      />
      <div className='p-4'>
        <Link to={`/listpage/${listing._id}`} className='text-xl font-semibold truncate'>{listing.name}</Link>
        <p className='text-sm text-gray-500 truncate'>{listing.address}</p>
        <p className='mt-2 text-green-700 font-bold'>
          PKR {listing.offer ? listing.discountedPrice : listing.regularPrice}
          {listing.type === 'rent' && ' / month'}
        </p>
        <p className='text-xs text-gray-400 mt-1 truncate'>
          {listing.description}
        </p>
      </div>
    </div>
  ))}
</div>

    </div>
  )
}

export default Home
