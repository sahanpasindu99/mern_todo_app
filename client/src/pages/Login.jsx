import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

function Login() {
  const navigate = useNavigate();
  const { user, loginUser} = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    password: '',
    email: '',
  });
  const handlelogin = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    setLoading(true);
     await loginUser(email,password)
     setLoading(false);

  };


  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
        <div className="md:w-1/2 px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
          <p className="text-sm text-[#002D74] mt-4">If you are already a member, log in</p>
          <form onSubmit={handlelogin} className="flex flex-col gap-4">
            <input
              id="email"
              type="email"
              placeholder="Enter Email"
              className="pt-2 mt-8 px-4 py-2 rounded-xl border w-full"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              className="pt-2 px-4 py-2 rounded-xl border w-full"
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
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <p className="mt-2 text-xs py-2">
              Forgot your password? <Link to="/forgot-password" className="text-blue-900">Click here</Link>
            </p>

            <div className="flex items-center mt-2">
              <div className="w-1/2 border-t border-solid border-gray-300"></div>
              <div className="mx-4 text-gray-500 text-xs">OR</div>
              <div className="w-1/2 border-t border-solid border-gray-300"></div>
            </div>
          </form>

          <div className="mt-5 text-xs flex justify-between items-center">
            <p>Don't have an account? </p>
            <Link to="/register">
              <button className="py-2 px-5 bg-white border hover:scale-105 duration-200 rounded-xl">Register</button>
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
    </section>
  );
}

export default Login;
