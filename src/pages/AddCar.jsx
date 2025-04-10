import React, { useState } from "react";
import { addCar } from "../services/admin.services";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    engine: "",
    color: "",
    stock_quantity: "",
    description: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: selectedFiles,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addCar(formData);
      toast.success("Car added successfully!");
      setFormData({
        name: "",
        model: "",
        year: "",
        price: "",
        mileage: "",
        engine: "",
        color: "",
        stock_quantity: "",
        description: "",
        images: [],
      });
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to add car");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex justify-center items-center px-4 text-white'>
      <Toaster />
      <div className='w-full max-w-4xl bg-[#1e1e1e] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-sm p-8'>
        <h2 className='text-3xl font-semibold mb-6 text-center'>Add New Car</h2>
        <form
          className='grid grid-cols-1 md:grid-cols-2 gap-5'
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Car Name'
            className='px-4 py-3 bg-[#2c2c2c] text-white border border-neutral-700 rounded-xl focus:outline-none focus:border-[#1DCD9F] transition-all duration-300'
          />
          <input
            type='text'
            name='model'
            value={formData.model}
            onChange={handleChange}
            placeholder='Model'
            className='px-4 py-3 bg-[#2c2c2c] text-white border border-neutral-700 rounded-xl focus:outline-none focus:border-[#1DCD9F] transition-all duration-300'
          />
          <input
            type='number'
            name='year'
            value={formData.year}
            onChange={handleChange}
            placeholder='Year'
            className='px-4 py-3 bg-[#2c2c2c] text-white border border-neutral-700 rounded-xl focus:outline-none focus:border-[#1DCD9F] transition-all duration-300'
          />
          <input
            type='number'
            name='price'
            value={formData.price}
            onChange={handleChange}
            placeholder='Price (PKR)'
            className='px-4 py-3 bg-[#2c2c2c] text-white border border-neutral-700 rounded-xl focus:outline-none focus:border-[#1DCD9F] transition-all duration-300'
          />
          <input
            type='number'
            name='mileage'
            value={formData.mileage}
            onChange={handleChange}
            placeholder='Mileage (km)'
            className='px-4 py-3 bg-[#2c2c2c] text-white border border-neutral-700 rounded-xl focus:outline-none focus:border-[#1DCD9F] transition-all duration-300'
          />
          <input
            type='text'
            name='engine'
            value={formData.engine}
            onChange={handleChange}
            placeholder='Engine'
            className='px-4 py-3 bg-[#2c2c2c] text-white border border-neutral-700 rounded-xl focus:outline-none focus:border-[#1DCD9F] transition-all duration-300'
          />
          <input
            type='text'
            name='color'
            value={formData.color}
            onChange={handleChange}
            placeholder='Color'
            className='px-4 py-3 bg-[#2c2c2c] text-white border border-neutral-700 rounded-xl focus:outline-none focus:border-[#1DCD9F] transition-all duration-300'
          />
          <input
            type='number'
            name='stock_quantity'
            value={formData.stock_quantity}
            onChange={handleChange}
            placeholder='Stock Quantity'
            className='px-4 py-3 bg-[#2c2c2c] text-white border border-neutral-700 rounded-xl focus:outline-none focus:border-[#1DCD9F] transition-all duration-300'
          />
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Description'
            className='px-4 py-3 bg-[#2c2c2c] text-white border border-neutral-700 rounded-xl focus:outline-none focus:border-[#1DCD9F] transition-all duration-300 md:col-span-2'
            rows={3}
          />
          <div className='md:col-span-2'>
            <label className='block text-sm font-medium mb-1'>
              Upload Images (Multiple allowed)
            </label>
            <input
              type='file'
              name='images'
              multiple
              onChange={handleFileChange}
              accept='image/*'
              className='block w-full text-sm text-white bg-[#2c2c2c] border border-neutral-700 rounded-xl file:bg-[#1DCD9F] file:text-black file:font-semibold file:px-4 file:py-2 file:rounded-xl file:border-none file:mr-4'
            />
          </div>
          <button
            type='submit'
            className='w-full py-3 bg-[#1DCD9F] text-black font-semibold rounded-xl hover:bg-[#17b58b] transition-all duration-300 md:col-span-2'
          >
            {loading ? "Adding Car..." : "Add Car"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
