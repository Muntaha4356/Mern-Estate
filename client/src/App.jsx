
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Profile from './Pages/Profile'
import Header from './Components/Header'
import About from './Pages/About'
import ProtectedRoute from '../../../Mern-Auth/client/vite-project/src/Components/protectionFunctions/ProtectedRoute'
import UnProtectedRoute from '../../../Mern-Auth/client/vite-project/src/Components/protectionFunctions/UnprotectedRoute'
import CreateListing from './Pages/CreateListing'
import ListingCards from './Pages/ListingCards'
function App() {

  return (
    <>
    
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route element={<ProtectedRoute/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/list' element={<CreateListing/> }/>
            <Route path='/userlist' element={<ListingCards/>  }/>
          </Route>
          <Route element={<UnProtectedRoute/>}>
          
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup'element={<Signup/>}/>
          </Route>
        </Routes>
        
      </BrowserRouter>

    </>
  )
}

export default App
