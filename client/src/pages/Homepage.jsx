import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-6xl w-full flex">
        <div className="w-1/2">
          <div className=" h-screen py-2 bg-cover bg-center flex items-center rounded-md" style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506784781895-38847b5e50e7?auto=format&fit=crop&q=80&w=1376&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
          }}>
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-semibold text-gray-800 mb-4 text-center">
            Welcome to MyTodo
          </h1>
          <p className="text-lg text-gray-600 mb-8 text-center">Break big work into smaller tasks.</p>
          <div className="space-x-4">
            <Link to='/login'><button className="bg-[#0B0F12] hover:bg-gray-800 text-white mt-4 hover:scale-105 duration-200  py-2 px-4 rounded">
              Login
            </button></Link>
            <Link to='/login'>
            <button className="bg-green-700 hover:bg-green-600 text-white mt-4 hover:scale-105 duration-200  py-2 px-4 rounded">
              Register
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
