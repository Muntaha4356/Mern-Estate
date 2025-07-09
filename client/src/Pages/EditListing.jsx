import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
const EditListing = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);
    console.log("id",currentUser);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        regularPrice: 0,
        bedrooms: 0,
        furnished: false,
        parking: false,
        type: '',
        offer: false,
        imageUrls: [],
        userRef:currentUser._id,
        //sell and rents are types
      });


    useEffect(()=> {
        const fetchListing = async() =>{
            try{
                const res = await fetch(`http://localhost:3000/api/list/get/${id}`);
                const data = await res.json();

                if(data.success) {
                    setFormData(data.listing);
                    
                }else {
                    alert('Listing not found');
                }
            }catch (err) {
                console.error(err);
            }
        };
        fetchListing();
    }, [id, currentUser])
    console.log(formData);

    const handleChange = (e) =>{
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
        }));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            const updateRes = await fetch(`http://localhost:3000/api/list/edit/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            const updateData = await updateRes.json();
            if (!updateData.success) throw new Error(updateData.message);

            alert('✅ Listing updated!');
            navigate('/profile'); 

        }catch (err) {
            console.error(err);
            alert('❌ Failed to update listing');
        }

    }
  return (
    <div className="p-3 max-w-xl mx-auto bg-gray-50 rounded-lg shadow">
      <h2 className="text-3xl font-semibold text-center my-7">Edit Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
        value={formData.name}
        onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <div className="flex items-center space-x-4 mt-2">
          <label>
            <div className="flex items-center space-x-4 mt-2">
  <label>
    <input
      type="checkbox"
      name="sell"
      checked={formData.type === 'sell'}
      onChange={() => {
        setFormData((prev) => ({
          ...prev,
          type: prev.type === 'sell' ? '' : 'sell' // toggle off if re-clicked
        }));
      }}
    />
    <span className="ml-1">Sell</span>
  </label>

  <label>
    <input
      type="checkbox"
      name="rent"
      checked={formData.type === 'rent'}
      onChange={() => {
        setFormData((prev) => ({
          ...prev,
          type: prev.type === 'rent' ? '' : 'rent'
        }));
      }}
    />
    <span className="ml-1">Rent</span>
  </label>
</div>

          </label>
          <label>
            <input
              type="checkbox"
              name="parking"
              checked={formData.parking}
              onChange={handleChange}
            />
            <span className="ml-1">Parking spot</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="furnished"
              checked={formData.furnished}
              onChange={handleChange}
            />
            <span className="ml-1">Furnished</span>
          </label>
        </div>

        <div className="flex items-center space-x-4">
          <label>
            <input
              type="checkbox"
              name="offer"
              checked={formData.offer}
              onChange={handleChange}
            />
            <span className="ml-1">Offer</span>
          </label>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="number"
            name="bedrooms"
            min="1"
            value={formData.bedrooms}
            onChange={handleChange}
            className="w-20 p-2 border rounded"
          />
          <span>Beds</span>
          
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="number"
            name="regularPrice"
            value={formData.regularPrice}
            onChange={handleChange}
            className="w-32 p-2 border rounded"
          />
          <span>Regular price ($ / Month)</span>
        </div>

        {/* <div>
          <label className="block mb-1 font-semibold">Images:</label>
          <p className="text-sm mb-1 text-gray-500">The first image will be the cover (max 6)</p>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="block"
          />
          
          
        </div> */}


        {/* {previewUrls.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-4">
            {previewUrls.map((url, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={url}
                  alt={`Preview ${idx}`}
                  className="w-full h-32 object-cover rounded shadow"
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(idx)}
                  className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full hover:bg-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )} */}



        <button
          type="submit"
          
          className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
        >
          Update List
        </button>
      </form>
    </div>
  )
}

export default EditListing
