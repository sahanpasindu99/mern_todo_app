import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const getEmail = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      if(!email){
        toast.error('Email should be entered');

      }
      else{
        const response = await axios.post('/forgot-password',  {email} );
        if (response.status === 200) {
          toast.success('Reset Email sent');
          setEmail('');
          navigate('/login');
        } else {
          toast.error("Email is not sent",error);
        }
      }
     
    } catch (error) {
      console.log(error);
      toast.error('No user found');
    }

    setLoading(false); 
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg p-4 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Get verification e-mail</h2>
        <form onSubmit={getEmail} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pt-2 px-4 py-2 rounded-xl border w-full focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className={`w-full bg-[#0B0F12] rounded-xl py-2 text-white mt-4 hover:scale-105 duration-200 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Continue'}
          </button>
          <p className="mt-2 text-xs py-2">
              Go back to login <Link  to="/login" className="text-blue-900">Click here</Link>
            </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
