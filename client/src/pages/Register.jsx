import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
function Register() {
  const navigate = useNavigate();
  const { user,setUser,isLoading } = useContext(UserContext);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    setLoading(true); 

    try {
      if (password.length < 6) {
        toast.error('Password must not be less than 6 characters');
      } else {
        const response = await axios.post('/register', {
          name,email,password
        });

        if (response.status === 200) {
          setData({});
          toast.success('Registration Successful');
          navigate('/login');
        } else {
          toast.error('Registration unsuccessful');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Error occurred during registration');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
        <div className="md:w-1/2 px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>
          <p className="text-sm text-[#002D74] mt-4">If you do not have an account</p>
          <form onSubmit={registerUser} className="flex flex-col gap-4">
            <input
              placeholder="Enter Name"
              className='pt-2 mt-8 px-4 py-2 rounded-xl border w-full'
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />
            <input
              placeholder="Enter Email"
              className='pt-2 px-4 py-2 rounded-xl border w-full'
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
            <input
              placeholder="Enter Password"
              className='pt-2 px-4 py-2 rounded-xl border w-full'
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
            <button
              type="submit"
              className={`bg-[#0B0F12] rounded-xl py-2 text-white mt-4 hover:scale-105 duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>

            <div className="flex items-center mt-2">
              <div className="w-1/2 border-t border-solid border-gray-300"></div>
              <div className="mx-4 text-gray-500 text-xs">OR</div>
              <div className="w-1/2 border-t border-solid border-gray-300"></div>
            </div>
          </form>  
          <div className="mt-5 text-xs flex justify-between items-center">
            <p>Already have an account? </p>
            <Link to="/login">
              <button className="py-2 px-5 bg-white border hover:scale-105 duration-200 rounded-xl">Login</button>
            </Link>
          </div>
        </div>
       
       
        <div className="w-1/2 sm:block hidden">
        <img
            className="rounded-2xl"
            src="https://images.unsplash.com/photo-1506784781895-38847b5e50e7?auto=format&fit=crop&q=80&w=1376&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
       
      </div>
    </div>
  );
}

export default Register;
