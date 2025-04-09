import React, { useState, useEffect } from "react";
import { getCars } from "../services/admin.services";

const Cars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    getCars()
      .then((data) => {
        console.log(data);
        setCars(data);
      })
      .catch((error) => console.error("Failed to fetch cars:", error));
  }, []);

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-10'>
      <h1 className='text-4xl font-bold mb-10 text-center'>Available Cars</h1>
      <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        {cars.map((car) => (
          <div
            key={car._id}
            className='bg-[#1e1e1e] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-sm p-5 flex flex-col gap-4'
          >
            {car.images.length > 0 ? (
              <img
                src={car.images[0]}
                alt={`${car.name} ${car.model}`}
                className='w-full h-48 object-cover rounded-xl'
              />
            ) : (
              <div className='w-full h-48 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400'>
                No Image
              </div>
            )}
            <div>
              <h2 className='text-2xl font-semibold'>
                {car.name} {car.model}
              </h2>
              <p className='text-sm text-gray-400'>{car.description}</p>
            </div>
            <div className='grid grid-cols-2 gap-2 text-sm'>
              <p>
                <span className='text-gray-400'>Year:</span> {car.year}
              </p>
              <p>
                <span className='text-gray-400'>Color:</span>{" "}
                {car.color || "N/A"}
              </p>
              <p>
                <span className='text-gray-400'>Engine:</span> {car.engine}
              </p>
              <p>
                <span className='text-gray-400'>Mileage:</span> {car.mileage} km
              </p>
              <p>
                <span className='text-gray-400'>Price:</span> Rs.{" "}
                {car.price.toLocaleString()}
              </p>
              <p>
                <span className='text-gray-400'>In Stock:</span>{" "}
                {car.stock_quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
