import React, { useState } from "react";
import { addCar } from "../services/admin.services";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    fuel: "Petrol",
    transimission: "Automatic",
    mileage: "",
    engine: "",
    color: "",
    trim: "",
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
      images: [...prev.images, ...selectedFiles],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData();
    for (let key in formData) {
      if (key === "images") {
        formData.images.forEach((file) => form.append("images", file));
      } else {
        form.append(key, formData[key]);
      }
    }

    try {
      await addCar(form);
      toast.success("Car added successfully!");
      setFormData({
        make: "",
        model: "",
        year: "",
        price: "",
        fuel: "Petrol",
        transimission: "Automatic",
        mileage: "",
        engine: "",
        color: "",
        trim: "",
        description: "",
        images: [],
      });
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to add car");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex justify-center items-center p-4 text-white'>
      <button
        onClick={() => navigate("/dashboard")}
        className='absolute top-4 left-6 cursor-pointer px-3 py-2 bg-[#1DCD9F] text-black font-semibold rounded-xl hover:bg-[#17b58b] transition-all duration-300'
      >
        {"<-"}
      </button>
      <Toaster />
      <div className='w-full max-w-4xl bg-[#1e1e1e] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-sm p-8'>
        <h2 className='text-3xl font-semibold mb-6 text-center'>Add New Car</h2>
        <form
          className='grid grid-cols-1 md:grid-cols-2 gap-5'
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            name='make'
            value={formData.make}
            onChange={handleChange}
            placeholder='Make'
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
            placeholder='Price (USD)'
            className='px-4 py-3 bg-[#2c2c2c] text-white border border-neutral-700 rounded-xl focus:outline-none focus:border-[#1DCD9F] transition-all duration-300'
          />
          <select
            name='fuel'
            value={formData.fuel}
            onChange={handleChange}
            className='px-4 py-3 bg-[#2c2c2c] text-white border border-neutral-700 rounded-xl focus:outline-none focus:border-[#1DCD9F] transition-all duration-300'
          >
            <option value='Petrol'>Petrol</option>
            <option value='Diesel'>Diesel</option>
          </select>
          <select
            name='transimission'
            value={formData.transimission}
            onChange={handleChange}
            className='px-4 py-3 bg-[#2c2c2c] text-white border border-neutral-700 rounded-xl focus:outline-none focus:border-[#1DCD9F] transition-all duration-300'
          >
            <option value='Automatic'>Automatic</option>
            <option value='Manual'>Manual</option>
          </select>
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
            type='text'
            name='trim'
            value={formData.trim}
            onChange={handleChange}
            placeholder='Trim'
            className='px-4 py-3 bg-[#2c2c2c] text-white border border-neutral-700 rounded-xl focus:outline-none focus:border-[#1DCD9F] transition-all duration-300'
          />
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Description'
            rows={3}
            className='px-4 py-3 bg-[#2c2c2c] text-white border border-neutral-700 rounded-xl focus:outline-none focus:border-[#1DCD9F] transition-all duration-300 md:col-span-2'
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
