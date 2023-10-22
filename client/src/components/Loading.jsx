import React from 'react';

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-70 bg-gray-900">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-center text-gray-700 text-xl font-semibold">Loading...</p>
       
      </div>
    </div>
  );
};

export default Loading;
