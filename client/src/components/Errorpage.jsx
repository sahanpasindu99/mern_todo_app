import React from 'react';
import { Link } from 'react-router-dom';

const Errorpage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h1 className="text-4xl font-extrabold text-gray-800">404 - Page Not Found</h1>
        <p className="text-gray-500 p-2 mb-4">It seems you are already logged in or check the url</p>
        <div className="flex justify-center space-x-4 mt-3">
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg py-2 px-6 text-sm"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-2 px-6 text-sm"
          >
            Register
          </Link>
          <Link
            to="/dashboard"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg py-2 px-6 text-sm"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Errorpage;
