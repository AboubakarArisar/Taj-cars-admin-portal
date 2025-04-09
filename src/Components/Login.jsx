import React, { useState, useEffect } from "react";
import { Login as Signin } from "../services/admin.services";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    const role = admin.role;
    const token = localStorage.getItem("token");
    toast.success("you are already loggedin");
    if (role && token) navigate("/dashboard");
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      Signin(formData)
        .then((data) => {
          const { admin, token } = data;
          localStorage.setItem("admin", JSON.stringify(admin));
          localStorage.setItem("token", token);
          toast.success("logged in Succesfully");
          navigate("/dashboard");
          setFormData({
            username: "",
            password: "",
          });
        })
        .catch((error) => toast.error("Invaild Credientials"))
        .finally(() => setLoading(false));
      console.log(formData);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className='w-full h-screen bg-gradient-to-br from-black via-gray-900 to-black flex justify-center items-center px-4 text-white'>
      <Toaster />
      <div className='w-full max-w-md bg-[#1e1e1e] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-sm p-8'>
        <h2 className='text-3xl font-semibold mb-6 text-center'>
          Welcome Back Admin
        </h2>
        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
          <input
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
            className='px-4 py-3 bg-[#2c2c2c] text-white border border-neutral-700 rounded-xl focus:outline-none focus:border-[#1DCD9F] transition-all duration-300'
            placeholder='Username'
          />
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='px-4 py-3 bg-[#2c2c2c] text-white border border-neutral-700 rounded-xl focus:outline-none focus:border-[#1DCD9F] transition-all duration-300'
            placeholder='Password'
          />
          <button
            type='submit'
            className='w-full py-3 bg-[#1DCD9F] text-black font-semibold rounded-xl hover:bg-[#17b58b] transition-all duration-300'
          >
            {loading ? <span>Logging in...</span> : <span>Login</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
