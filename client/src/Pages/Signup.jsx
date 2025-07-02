import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
const Signup = () => {
  return (
    <div className='p-3 max-w-lg  mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input 
        type='text' 
        placeholder='UseName' 
        className='border-none p-3 rounded-2xl'/>
        <input 
        type='email' 
        placeholder='Email' 
        className='border-none p-3 rounded-2xl'/>
        <input 
        type='password' 
        placeholder='Password' 
        className='border-none p-3 rounded-2xl' />
        <button 
        className='bg-red-400 border-none p-3 rounded-2xl'>
          Sign Up
        </button>
        <button 
        className='border-none p-3 rounded-2xl bg-red-500'>
          Continue with Google
        </button>
      </form>
      <p className='p-3'>Have an Account? <Link to={'/signin'}>Sign in</Link></p>
      
    </div>
  )
}

export default Signup
