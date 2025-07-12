import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/userSlices/userSlice';
import {useNavigate} from 'react-router-dom'
const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleAuth = async(e) =>{

        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            console.log(result);
            const res= await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/auth/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: result.user.displayName, email: result.user.email,profilepic: result.user.photoURL}),
            })
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
        }catch(error){
            console.log(error);
        }
    }
  return (
    
      <button type='button' onClick={handleGoogleAuth}
        className='border-none p-3 rounded-2xl bg-red-500'>
          Continue with Google
        </button>
    
  )
}

export default OAuth
