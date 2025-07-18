import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { signInSuccess, signInFailure, signInStart } from '../redux/userSlices/userSlice';
import OAuth from '../Components/OAuth';


const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData,  setFormData] = useState({
    email:'',
    password:'',
  })
  const handleChange = (e) =>{
    setFormData((prev)=> ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit =async (e)=>{
    e.preventDefault();
    dispatch(signInStart());
    setLoading(true);
    try{
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/auth/login`, {
        method: 'POST',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const result = await response.json();
      console.log(result);
      if(result.success){
        console.log("ewww bee");
        
        localStorage.setItem("token", result.token);
        dispatch(signInSuccess({ user: result.user, token: result.token })); 
        alert("Logged in successfully!");
        setError(null);
        navigate('/');

      }else {
        dispatch(signInFailure(result.message));
        alert(`Error: ${result.message}`);
        setError(result.message)
      
      }
      setLoading(false);

    }
    catch (err) {
      dispatch(signInFailure(err.message || 'Something went wrong'));
      alert('Login failed. Please try again.');
      setLoading(false);
      setError(err);
      console.error(err);}
  }
  return (
      <div className='p-3 max-w-lg  mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit ={handleSubmit}>
        
        <input 
        onChange={handleChange}
        type='email' 
        name='email'
        value={formData.email}
        placeholder='Email' 
        className='border-none p-3 rounded-2xl'/>
        <input 
        onChange={handleChange}
        type='password' 
        name='password'
        value={formData.password}
        placeholder='Password' 
        className='border-none p-3 rounded-2xl' />
        <button 
        type='submit' 
        
        className='bg-red-400 border-none p-3 rounded-2xl'>
          {loading ? 'Loading...' : 'SignIn'}
        </button>
        <OAuth/>
      </form>
      <p className='p-3'>Don't Have an Account? <Link to={'/signup'}>Sign Up</Link></p>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default Signin
