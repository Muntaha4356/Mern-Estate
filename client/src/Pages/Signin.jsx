import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { signInSuccess, signInFailure, signInStart } from '../redux/userSlices/userSlice';


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
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const result = await response.json();
      if(result.success){
        dispatch(signInSuccess(result.user)); 
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
        <button 
        className='border-none p-3 rounded-2xl bg-red-500'>
          Continue with Google
        </button>
      </form>
      <p className='p-3'>Don't Have an Account? <Link to={'/signup'}>Sign Up</Link></p>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default Signin
