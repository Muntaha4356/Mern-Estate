import React, { useEffect, useState, useRef } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate =useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');
    const fileRef = useRef(null);
    const [image, setImage] = useState();
    const [currentUser, setCurrentUser] = useState();
    
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await fetch('http://localhost:3000/api/user/data', {
      method: 'GET',
      credentials: 'include' 
    }
          );
          const data = await res.json();
          if (data.success) {
            console.log(data.user);
            // optionally set state here
            const user = data.userData;
            setName(user.name);
            setEmail(user.email);
            setUserId(user._id);
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchUser(); // ✅ CALL IT HERE
    }, []);


    useEffect(() => {
        axios
          .get("http://localhost:3000/api/auth/isLoggedIn", { withCredentials: true }) 
          .then((res) => {
            console.log(res.success);
            setCurrentUser(res.data.user);
          })
          .catch((err) => {
            console.error("Auth check failed:", err.message);
          });
      }, []);

    const handleUpdate = async (e) => {
      e.preventDefault(); // prevent form refresh

      // formData.append('profilepic', profilepic); // this is the File object
      const updatedUser = {
        userId,
        name
      };

      try {
        const res = await fetch('http://localhost:3000/api/user/updateUser', {
          method: 'PUT',
          body: JSON.stringify(updatedUser), // don't set Content-Type manually
          credentials: 'include' 
        });

        const data = await res.json();
        if (data.success) {
          alert("Profile Updated");
          console.log(data.user); // debug
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error(err);
        alert("Update failed");
      }
    };

    const handleChange =(e) =>{
      if(e.target.files){
        setImage(e.target.files[0]);
      }
    }
    const onSubmit = async () =>{
    if(!image) {
      alert("Please select an image");

      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    const response = await fetch("http://localhost:3000/api/user/upload-image", {
    method: "PUT",
    body: formData,
    credentials: 'include'  // ✅ cookie-based
  });
    const result = await response.json();
    if(result.success){
            alert("Logged in successfully!");
            
    
          }else {
            alert(`Error: ${result.message}`);
            
          
          }
  }
   const handleDelete = async (emailvalue) =>{
      console.log(emailvalue);
      try{
        const res=await fetch("http://localhost:3000/api/user/delete", {
          method:"PUT",
          headers:{
            "Content-Type":"application/json",
          },
          credentials: "include",
          body: JSON.stringify({email: emailvalue})
        });
        const data = await res.json();
        if(data.success){
          alert("User Deleted Successfully");
          localStorage.clear();
          navigate("/signin");
        }else{
          alert("Error: "+ data.message)
        }
      }catch(error){
        console.log(error);
        
      }
   }

    const handleLogout = async(e)=>{
    try{
      const response = await fetch('http://localhost:3000/api/auth/logout', {
        method:'POST',
        credentials: 'include',
        headers:{
          'Content-Type': 'application/json'
        }
      })
      const result = await response.json();
      if(result.success){
        alert('LogOut');
        navigate('/unauth');
      }else {
        alert(`Error: ${result.message}`);
      }
    }catch(error) {
          console.error(error);
          alert('Logged out failed. Try again later.');
        }
  }
   
  return (
    <section className="max-w-lg mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center my-6">Profile</h1>
      
      <form className="flex flex-col gap-4">
        <div className="flex flex-col items-center mb-6">
          <input 
        ref={fileRef} 
        type="file"
        id="profile-upload"
        accept="image/*"
        onChange={handleChange}
        hidden
       
        name="profileimage"
      />
        <img
        onClick={()=>fileRef.current.click()}
        id="profile-preview"
        src={currentUser?.profilepic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
        alt="profile"
        className="w-20 h-20 rounded-full object-cover border"
      />
      <button onClick={onSubmit}>
        submit
      </button>

      </div>
        
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          name='name'
          value={name} onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          name='email'
          value={email}
          disabled
        />
        

        <button
        type="submit" onClick={handleUpdate} 
        className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90">
          Update
        </button>
        <button className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-90">
          Create Listing
        </button>
      </form>
      <div className="flex justify-between mt-6 text-sm">
        <span onClick={()=>handleDelete(email)} className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-blue-600 cursor-pointer">Show Listings</span>
        <span onClick={handleLogout} className="text-red-500 cursor-pointer">Sign out</span>
      </div>
    </section>
  )
}

export default Profile
