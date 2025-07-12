import React from 'react'
import { FaSearch } from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
const Header = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [currentUser, setCurrentUser] = useState()
    const [searchTerm, setSearchTerm]= useState('')
    const navigate = useNavigate();
    const location = useLocation();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/auth/isLoggedIn`, { withCredentials: true }) // must match backend route exactly
      .then((res) => {
        console.log(res.success);
        setIsAuthenticated(res.data.success);
        setCurrentUser(res.data.user);
        console.log(currentUser);
      })
      .catch((err) => {
        console.error("Auth check failed:", err.message); // helpful for debugging
        setIsAuthenticated(false);
      });
  }, []);

  useEffect(()=>{
    const urlParams= new URLSearchParams(location.search);
    const urlSearchTerm = urlParams.get('searchTerm');
    if(urlSearchTerm){
      setSearchTerm(urlSearchTerm);
    }
  }, [location.search]);

  const handleSearchSubmit = (e)=>{
    e.preventDefault();
    //geting info from url
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm );
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);

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
                onChange={(e) => setSearchTerm(e.target.value)}
                 />
                <button type='submit'>
                    <FaSearch className='text-slate-600'/>
                </button>
            </form>
            <ul className='flex flex-row '>
                <Link to='/'>
                <li className='pl-3 hover:underline '>Home</li>
                </Link>
                
                
                
                {isAuthenticated ? (
                    <Link to='/profile'>
                <li className='pl-3'>
                    <img
                        className='rounded-full h-7 w-7 object-cover'
                        src={currentUser.profilepic}
                        alt='profile'
                    />
                </li>
                </Link>
                ) : (
                <Link to='/signin'>
                    <li className='pl-3 hover:underline'>SignIn</li>
                </Link>
                )}
                
            </ul>
        </div>
    </header>
    <main>{children}</main></>
  )
}

export default Header
