import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const [formData,  setFormData] = useState({
      name:'',
      email:'',
      password:'',
    })
  const handleChange= (e) =>{
    setFormData({
      ...formData,
      //whatever is changing change its value
      [e.target.name] : e.target.value,
    });
    
  }
  console.log(formData);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoading(true);
    try{
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const result = await response.json();
      if(result.success){
        setLoading(false);
        console.log('Sign up Successful')
        setError(null);
        navigate('/');
      }else {
        console.log(`Error: ${result.message}`);
        setError(result.message)
      }
      setLoading(false);
      

    }
    catch (err) {
      setLoading(false);
      console.log('Login failed. Please try again.');
      console.error(err);
      setError(err);
    }
  }
  
  return (
    <div className='p-3 max-w-lg  mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit ={handleSubmit}>
        <input 
        name='name'
        value={formData.name}
        onChange={handleChange}
        type='text' 
        placeholder='UseName' 
        className='border-none p-3 rounded-2xl'/>
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
        disabled={loading}
        className='bg-red-400 border-none p-3 rounded-2xl'>
          {loading ? 'Loading...' : 'SignUp'}
        </button>
        <button 
        className='border-none p-3 rounded-2xl bg-red-500'>
          Continue with Google
        </button>
      </form>
      <p className='p-3'>Have an Account? <Link to={'/signin'}>Sign in</Link></p>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default Signup
