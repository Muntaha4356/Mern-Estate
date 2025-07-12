import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
const CreateListing = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const currentUser = useSelector((state)=> state.user.currentUser);
  const [listId, setListId] = useState('');
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

  console.log(formData);
  const handleChange = (e) =>{
    //in handleChange I have to set 
    const {name, value, type, checked} = e.target;
    setFormData((prev)=>({
      ...prev,
      [name]: type== 'checkbox' ? checked : value

    }));
    console.log(formData);
  }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
          const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/list/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          if(!res.ok){
            throw new Error('Failed to create listing');
          }
          console.log(res);
          console.log("The list")
          const newList = await res.json();
          const listIdrec = newList._id;
          
          console.log(listIdrec)
          setListId(listIdrec)
          console.log("✅ Listing created:", listIdrec);

          localStorage.setItem("createdListId", listIdrec);
          await createListUpload(listIdrec);
        }catch(error){
          console.error("Error during listing creation:", error);
          alert("Something went wrong. Please try again.");
        }
    }
    const createListUpload= async (listIdPassed)=>{
      console.log(listIdPassed)
      if (files.length === 0) navigate('/');
      if(files.length > 0 && files.length <7){
        const promises = [];

        for (let i=0; i<files.length; i++){
          const formData = new FormData();
          formData.append('image', files[i]);
          formData.append('listId', listIdPassed);
          promises.push(
            fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/list/uploadlistimage`,{
              method:"POST",
              body: formData, 
              credentials: 'include'
            }).then(res => res.json()
          )
          );

        }
        try{
            const results = await Promise.all(promises);
            console.log("All image URLs saved:", results);
            navigate('/')
        }catch (error) {
          console.error("Upload failed:", error);
        }
      }
      
    }

    const handleImageDelete = (index) => {
  const newFiles = [...files];
  const newPreviews = [...previewUrls];
  newFiles.splice(index, 1);
  newPreviews.splice(index, 1);
  setFiles(newFiles);
  setPreviewUrls(newPreviews);
};

    // const uploadImages = () => { //these are temporarily to show
    //   if(files.length === 0) return;
    //   const urls = files.map(file => URL.createObjectURL(file));
    //   setPreviewUrls(urls);
    // }


    // const storeImage = async (file)=>{
    //   const formData = new FormData();
    //   formData.append('file', file);
    //   formData.append('upload_present')
    //   // return new Promise((resolve, reject)=>{
        
    //   // })
    // }
    const handleImageChange =(e)=>{
      const selectedFiles = Array.from(e.target.files);
  setFiles((prev) => [...prev, ...selectedFiles]);

  const newPreviewUrls = selectedFiles.map((file) =>
    URL.createObjectURL(file)
  );
  setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    }
  return (
    <div className="p-3 max-w-xl mx-auto bg-gray-50 rounded-lg shadow">
      <h2 className="text-3xl font-semibold text-center my-7">Create a Listing</h2>
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

        <div>
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
          
          {/* <button type='button' onClick={uploadImages} className='border-green-400 min-w-sm '>Upload</button> */}
        </div>


        {previewUrls.length > 0 && (
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
        )}



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
