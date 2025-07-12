import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
const EditListing = () => {
    const [loading, setLoading] = useState(false);
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


    const [existingImages, setExistingImages] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const [newFiles, setNewFiles] = useState([]);
    const [newPreviews, setNewPreviews] = useState([]);

    


    useEffect(()=> {
        const fetchListing = async() =>{
            try{
                const res = await fetch(`http://localhost:3000/api/list/get/${id}`);
                const data = await res.json();

                if(data.success) {
                    setFormData(data.listing);
                    setExistingImages(data.listing.imageUrls || []);
                    
                    
                }else {
                    alert('Listing not found');
                }
            }catch (err) {
                console.error(err);
            }
        };
        fetchListing();
    }, [id, currentUser])
    console.log('newFiles',newFiles)
    console.log('existingImages',existingImages);
    console.log('imagesToDelete',imagesToDelete);
    

    const handleChange = (e) =>{
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
        }));
    }

    //

    const handleRemoveExistingImage = (publicId, imageId) => {
        setImagesToDelete((prev) => [...prev, { _id: imageId, public_id: publicId }]);
        setExistingImages((prev) => prev.filter((img) => img.public_id !== publicId));
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            setLoading(true);
            const updateRes = await fetch(`http://localhost:3000/api/list/edit/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({...formData,
                toDeleteImages: imagesToDelete  
            }),
            });

            const updateData = await updateRes.json();
            if (!updateData.success) throw new Error(updateData.message);
            for (const file of newFiles) {
                const imageData = new FormData();
                imageData.append('listId', id);
                imageData.append('image', file);
                try{
                    const imgRes = await fetch('http://localhost:3000/api/list/uploadlistimage',{
                    method: 'POST',
                    body: imageData
                });
                const imgData = await imgRes.json();
                if (!imgData.success) {
                    console.warn('Failed to upload image:', imgData.message);
                }

                }catch(uploadErr){
                    console.error('Image upload error:', uploadErr);
                }
                
            }
            setNewFiles([]);
            setNewPreviews([]);
            alert('✅ Listing updated!');
            navigate('/profile'); 

        }catch (err) {
            console.error(err);
            alert('Failed to update listing');
        }
        setLoading(false);

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
        {/* New Images */}
        <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => {
            const files = Array.from(e.target.files);
            setNewFiles(files);

            const previews = files.map(file => URL.createObjectURL(file));
            setNewPreviews(previews);
        }}
        />

        {newPreviews.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mt-4">
            {newPreviews.map((url, idx) => (
              <div key={idx} className="relative group">  
            <img
                key={idx}
                src={url}
                alt={`New Preview ${idx}`}
                className="w-full h-32 object-cover rounded shadow"
            />
            <button
          type="button"
          onClick={() => {
            const updatedPreviews = [...newPreviews];
            const updatedFiles = [...newFiles];
            updatedPreviews.splice(idx, 1);
            updatedFiles.splice(idx, 1);
            setNewPreviews(updatedPreviews);
            setNewFiles(updatedFiles);
          }}
          className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full hover:bg-red-700"
        >
          ✕
        </button>
        </div>
            ))}
        </div>
        )}


        {/* Existing Images */}
        
        
        {existingImages.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-4">
                {existingImages.map((img, idx) => (
                <div key={idx} className="relative group">
                        <img
                        src={img.url}
                        alt={`Image ${idx}`}
                        className="w-full h-32 object-cover rounded shadow"
                        />
                        <button
                        type="button"
                        onClick={() => handleRemoveExistingImage(img.public_id, img._id)}
                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full hover:bg-red-700"
                        >
                        ✕
                        </button>
                    </div>
                    ))}
                </div>
                )}



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
