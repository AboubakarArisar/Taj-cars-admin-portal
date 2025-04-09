import React from "react";

const Login = () => {
  return (
    <div className='w-full h-screen bg-gradient-to-br from-black via-gray-900 to-black flex justify-center items-center px-4 text-white'>
      <div className='w-full max-w-md bg-[#1e1e1e] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-sm p-8'>
        <h2 className='text-3xl font-semibold mb-6 text-center'>
          Welcome Back Admin
        </h2>
        <form className='flex flex-col gap-5'>
          <input
            type='email'
            className='px-4 py-3 bg-[#2c2c2c] text-white border border-neutral-700 rounded-xl focus:outline-none focus:border-[#1DCD9F] transition-all duration-300'
            placeholder='Email address'
          />
          <input
            type='password'
            className='px-4 py-3 bg-[#2c2c2c] text-white border border-neutral-700 rounded-xl focus:outline-none focus:border-[#1DCD9F] transition-all duration-300'
            placeholder='Password'
          />
          <button
            type='submit'
            className='w-full py-3 bg-[#1DCD9F] text-black font-semibold rounded-xl hover:bg-[#17b58b] transition-all duration-300'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
