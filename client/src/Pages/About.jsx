import React from 'react'
import { useState } from 'react'

const About = () => {
  const [image, setImage] = useState();

  const handleChange =(e) =>{
    if(e.target.files){
      setImage(e.target.files[0]);
    }
  }
  console.log("Image ", image);
  const onSubmit = async () =>{
    if(!image) {
      alert("Please select an image");

      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/user/upload-image`, {
    method: "POST",
    body: formData,
    credentials: 'include',
    withCredentials: true,
  });
    const result = await response.json();
    if(result.success){
            alert("Logged in successfully!");
            
    
          }else {
            alert(`Error: ${result.message}`);
            
          
          }                       
  }
  return (
    <div>
      <div className="">
        <input onChange={handleChange} type="file" accept='image/*' />
      </div>

      <button onClick={onSubmit}
       className='mt-4 bg-black text-white p-2 font-semibold rounded'>
        Upload image
      </button>


      <div className="mt-4">
        <h1 className='text-2xl font-semibol'>All Foods</h1>
      </div>
    </div>
  )
}

export default About
