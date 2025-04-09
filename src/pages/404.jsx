import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-[#111827] min-h-screen flex flex-col items-center justify-center text-white p-6'>
      <h1 className='text-6xl font-bold text-red-500 mb-4'>404</h1>
      <h2 className='text-3xl font-semibold mb-2'>Page Not Found</h2>
      <p className='text-gray-400 mb-6 text-center max-w-md'>
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/dashboard")}
        className='cursor-pointer bg-[#1DCD9F] hover:bg-[#17b58b] text-black py-3 px-6 rounded-xl font-semibold transition-all'
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFound;
