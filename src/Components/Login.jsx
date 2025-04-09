import React from "react";

const Login = () => {
  return (
    <>
      <div className='w-full h-screen bg-black flex justify-center items-center p-4 text-white'>
        <div className='w-1/3 shadow-2xl h-[50vh] bg-[#222222] rounded-md'>
          <form className='flex gap-4 flex-col justify-center items-center h-full'>
            <input
              type='email'
              className='px-4 py-2 outline-none bg-transparent border border-amber-50 rounded-lg'
              placeholder='Enter email'
            />
            <input
              type='password'
              className='px-4 py-2 outline-none bg-transparent border border-amber-50 rounded-lg'
              placeholder='Enter password'
            />
            <input type='submit' className='px-4 py-2 bg-blue-700 rounded-lg' />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
