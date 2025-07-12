
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Profile from './Pages/Profile'
import Header from './Components/Header'
import About from './Pages/About'
import CreateListing from './Pages/CreateListing'
import ListingCards from './Pages/ListingCards'
import EditListing from './Pages/EditListing'
import ListingPage from './Pages/ListingPage'
import Search from './Pages/Search'
import ProtectedRoute from './Components/ProtectedRoute'
import UnProtectedRoute from './Components/UnproductedRoute'
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
            <Route path='/editList/:id' element={ <EditListing/> } />
            <Route path='/listpage/:id' element={<ListingPage/>} />
            <Route path='/search' element={<Search/> } />
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
