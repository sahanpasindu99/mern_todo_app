import {Routes,Route,Navigate} from 'react-router-dom';
//import './App.css'
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Errorpage from './components/Errorpage';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import axios from 'axios';
import {Toaster} from 'react-hot-toast'
import { UserContext} from '../context/userContext';
import { useContext } from 'react';
import Loading from './components/Loading';

axios.defaults.baseURL='http://localhost:8022';
axios.defaults.withCredentials=true


function App() {
       const{user,isLoading}=useContext(UserContext)
  return (
    <>
      
    <Toaster position='top-center' toastOptions={{duration:2000}}/>
    {isLoading ? <Loading/>: (
       <Routes>
       {user ?(
        <>
        <Route element={<Dashboard/>} path='/dashboard'/>
        </>
       ):(
        <>
        <Route element={<Register/>} path='/register'/>
        <Route element={ <Homepage/> } path='/'/>
        <Route element={<Login/>} path='/login'/>
       <Route element={<ForgotPassword/>} path='/forgot-password'/>
        <Route element={<ResetPassword/>} path='/reset-password/:id/:token'/>
        </>
       )
      }
      <Route element={<Errorpage/>} path='/*'/>
      </Routes>

    )}
    
     </>
  );
}

export default App;
