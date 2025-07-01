import React from 'react'
import { FaSearch } from 'react-icons/fa';
import {Link} from 'react-router-dom'


const Header = ({children}) => {
    const handleSearchSubmit =(e)=>{
        e.preventDefault();

    }
  return (
    <>
    <header className='bg-slate-200 shadow-md'>
        <div className="flex  justify-between items-center  max-auto p-3">
            <Link to='/'>
            
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-slate-500'>Real</span>
                <span className='text-slate-700'>Estate</span>
                </h1>
            </Link>
            <form 
            className='flex bg-slate-100 p-3 rounded-lg items-center'
            onSubmit={handleSearchSubmit}>
                <input type="text" 
                placeholder='Search...' 
                className='bg-slate-100 p-3 rounded-lg flex items-center outline-none h-2'
                 />
                <button>
                    <FaSearch className='text-slate-600'/>
                </button>
            </form>
            <ul className='flex flex-row '>
                <Link to='/'>
                <li className='pl-3 hover:underline '>Home</li>
                </Link>
                
                <Link to='/about'>
                <li className='pl-3 hover:underline'>About</li>
                </Link>
                
                <Link to='/signin'>
                <li className='pl-3 hover:underline'>SignIn</li>
                </Link>
                
            </ul>
        </div>
    </header>
    <main>{children}</main></>
  )
}

export default Header
