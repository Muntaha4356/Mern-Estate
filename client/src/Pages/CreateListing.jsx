import React, { useState } from 'react'

const CreateListing = () => {
  const [files, setFiles] = useState([])
  console.log(files);
    const handleSubmit= async()=>{
        console.log("meo")
    }
    const uploadImages = async (e)=>{
      if(files.length > 0 && files.length <7){
        const promises = [];

        for (let i=0; i<files.length; i++){
          promises.push(storeImage(files[i]));

        }
      }
    }
    const storeImage = async (file)=>{
      // return new Promise((resolve, reject)=>{
        
      // })
    }
  return (
    <div className="p-3 max-w-xl mx-auto bg-gray-50 rounded-lg shadow">
      <h2 className="text-3xl font-semibold text-center my-7">Create a Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
        //   value={formData.name}
        //   onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
        //   value={formData.description}
        //   onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
        //   value={formData.address}
        //   onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <div className="flex items-center space-x-4 mt-2">
          <label>
            <input
              type="checkbox"
              name="sell"
            //   checked={formData.sell}
            //   onChange={handleChange}
            />
            <span className="ml-1">Sell</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="rent"
            //   checked={formData.rent}
            //   onChange={handleChange}
            />
            <span className="ml-1">Rent</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="parking"
            //   checked={formData.parking}
            //   onChange={handleChange}
            />
            <span className="ml-1">Parking spot</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="furnished"
            //   checked={formData.furnished}
            //   onChange={handleChange}
            />
            <span className="ml-1">Furnished</span>
          </label>
        </div>

        <div className="flex items-center space-x-4">
          <label>
            <input
              type="checkbox"
              name="offer"
            //   checked={formData.offer}
            //   onChange={handleChange}
            />
            <span className="ml-1">Offer</span>
          </label>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="number"
            name="beds"
            min="1"
            // value={formData.beds}
            // onChange={handleChange}
            className="w-20 p-2 border rounded"
          />
          <span>Beds</span>
          <input
            type="number"
            name="baths"
            min="1"
            // value={formData.baths}
            // onChange={handleChange}
            className="w-20 p-2 border rounded"
          />
          <span>Baths</span>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="number"
            name="price"
            // value={formData.price}
            // onChange={handleChange}
            className="w-32 p-2 border rounded"
          />
          <span>Regular price ($ / Month)</span>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Images:</label>
          <p className="text-sm mb-1 text-gray-500">The first image will be the cover (max 6)</p>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={(e)=>setFiles(e.target.files)}
            className="block"
          />
          <button type='button' onClick={uploadImages} className='border-green-400 min-w-sm '>Upload</button>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
        >
          CREATE LISTING
        </button>
      </form>
    </div>
  )
}

export default CreateListing
