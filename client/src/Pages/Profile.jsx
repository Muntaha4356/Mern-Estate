import React, { useEffect, useState, useRef } from 'react'


const Profile = () => {
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profilepic, setProfilepic] = useState('');
    const [userId, setUserId] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const fileRef = useRef(null);

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
        setProfilepic(user.profilepic);
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


    const handleUpdate = async (e) => {
      e.preventDefault(); // prevent form refresh

      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('name', name);
      formData.append('profilepic', profilepic); // this is the File object

      try {
        const res = await fetch('http://localhost:3000/api/user/updateUser', {
          method: 'PUT',
          body: formData, // don't set Content-Type manually
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

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setProfilepic(file); // send actual file to backend
        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview); // for preview
        // Optional: show preview
        const reader = new FileReader();
        reader.onloadend = () => {
          document.getElementById('profile-preview').src = reader.result;
        };
        reader.readAsDataURL(file);
      }
    };

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
        onChange={(e)=>setProfilepic(e.target.files[0])}
        className=""
      />
        <img
        onClick={()=>fileRef.current.click()}
        id="profile-preview"
        src={previewUrl || typeof profilepic=='string' ? profilepic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
        alt="profile"
        className="w-20 h-20 rounded-full object-cover border"
      />

      </div>
        
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          name='username'
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
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-blue-600 cursor-pointer">Show Listings</span>
        <span className="text-red-500 cursor-pointer">Sign out</span>
      </div>
    </section>
  )
}

export default Profile
