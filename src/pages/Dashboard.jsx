import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CountCars } from "../services/admin.services";
import { LogoutButton } from "../Components/Logout";

const Loader = () => {
  return (
    <div className='flex justify-center items-center '>
      <div className='w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin'></div>
    </div>
  );
};

const Dashboard = () => {
  const [carCount, setCarCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    CountCars()
      .then((data) => setCarCount(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className='bg-[#111827] min-h-screen p-6 text-white'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-4xl font-bold'>Admin Dashboard</h1>
        <LogoutButton className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold transition-all' />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <div className='bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-700'>
          <h2 className='text-xl font-semibold mb-2'>Total Cars</h2>
          {loading ? (
            <Loader />
          ) : (
            <p className='text-5xl font-bold text-green-400'>{carCount}</p>
          )}
        </div>

        <div className='bg-gray-900 p-6 rounded-2xl shadow-md flex flex-col justify-between border border-gray-700'>
          <h2 className='text-xl font-semibold mb-4'>Manage Cars</h2>
          <button
            onClick={() => navigate("/cars")}
            className='mt-auto bg-[#1DCD9F] cursor-pointer hover:bg-[#17b58b] text-black py-3 px-4 rounded-lg font-semibold transition-all'
          >
            View Cars
          </button>
        </div>

        <div className='bg-gray-900 p-6 rounded-2xl shadow-md flex flex-col justify-between border border-gray-700'>
          <h2 className='text-xl font-semibold mb-4'>Add a New Car</h2>
          <button
            onClick={() => navigate("/add/car")}
            className='mt-auto bg-[#1DCD9F] cursor-pointer hover:bg-[#17b58b] text-black py-3 px-4 rounded-lg font-semibold transition-all'
          >
            Add Car
          </button>
        </div>
        <div className='bg-gray-900 p-6 rounded-2xl shadow-md flex flex-col justify-between border border-gray-700'>
          <h2 className='text-xl font-semibold mb-4'>View Contact Messages</h2>
          <button
            onClick={() => navigate("/view/contacts")}
            className='mt-auto bg-[#1DCD9F] cursor-pointer hover:bg-[#17b58b] text-black py-3 px-4 rounded-lg font-semibold transition-all'
          >
            View Messages
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
