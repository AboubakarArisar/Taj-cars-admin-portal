import React, { useState, useEffect } from "react";
import {
  getCars,
  deleteCar,
  getCarById,
  updateCar,
} from "../services/admin.services";
import { useNavigate } from "react-router-dom";
import "../index.css";
import toast, { Toaster } from "react-hot-toast";
const Loader = () => {
  return (
    <div className='flex justify-center items-center h-60'>
      <div className='w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin'></div>
    </div>
  );
};
const Cars = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editCarData, setEditCarData] = useState(null);

  const handleEditClick = (carId) => {
    getCarById(carId)
      .then((car) => {
        setEditCarData(car);
        setEditModalOpen(true);
      })
      .catch((error) => {
        toast.error("Failed to fetch car details");
        console.error(error);
      });
  };

  const handleDeleteClick = (carId) => {
    setSelectedCarId(carId);
    setShowDialog(true);
  };

  const confirmDelete = () => {
    deleteCar(selectedCarId)
      .then(() => {
        toast.success("Car deleted successfully");
        return getCars();
      })
      .then((updatedCars) => {
        setCars(updatedCars);
      })
      .catch((error) => {
        toast.error("Failed deleting the car");
        console.error(error);
      })
      .finally(() => {
        setShowDialog(false);
        setSelectedCarId(null);
      });
  };

  const cancelDelete = () => {
    setSelectedCarId(null);
    setShowDialog(false);
  };

  useEffect(() => {
    getCars()
      .then((data) => {
        console.log(data);
        setCars(data);
      })
      .catch((error) => console.error("Failed to fetch cars:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className='min-h-screen relative w-full bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-10'>
      <Toaster />
      <h1 className='text-4xl font-bold mb-10 text-center'>Available Cars</h1>
      <button
        onClick={() => navigate("/dashboard")}
        className='absolute top-4 left-6 cursor-pointer px-3 py-2  bg-[#1DCD9F] text-black font-semibold rounded-xl hover:bg-[#17b58b] transition-all duration-300'
      >
        {"<-"}
      </button>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {cars.length == 0 ? (
            <>
              <div>
                <h1>No Available Cars</h1>
              </div>
            </>
          ) : (
            <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
              {cars.map((car) => (
                <div
                  key={car._id}
                  className='bg-[#1e1e1e] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-sm p-5 flex flex-col gap-4'
                >
                  {car.images.length > 0 ? (
                    <>
                      <img
                        src={car.images[0]}
                        alt={`${car.name} ${car.model}`}
                        className='w-full h-48 object-cover rounded-xl relative'
                      />
                      <span>
                        <p className='absolute top-2 left-2 bg-[#1DCD9F] text-black font-semibold rounded-xl px-1 '>
                          {car.images.length} images
                        </p>
                      </span>
                    </>
                  ) : (
                    <div className='w-full h-48 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400'>
                      No Image
                    </div>
                  )}
                  <div className='grid grid-cols-2 gap-2 text-sm'>
                    <p>
                      <span className='text-gray-400'>Make:</span> {car.make}
                    </p>
                    <p>
                      <span className='text-gray-400'>Model:</span> {car.model}
                    </p>
                    <p>
                      <span className='text-gray-400'>Year:</span> {car.year}
                    </p>
                    <p>
                      <span className='text-gray-400'>Color:</span>{" "}
                      {car.color || "N/A"}
                    </p>
                    <p>
                      <span className='text-gray-400'>Engine:</span>{" "}
                      {car.engine}
                    </p>
                    <p>
                      <span className='text-gray-400'>Fuel:</span> {car.fuel}
                    </p>
                    <p>
                      <span className='text-gray-400'>Mileage:</span>{" "}
                      {car.mileage} km
                    </p>
                    <p>
                      <span className='text-gray-400'>Transmission:</span>{" "}
                      {car.transimission}
                    </p>
                    <p>
                      <span className='text-gray-400'>Trim:</span> {car.trim}
                    </p>
                    <p>
                      <span className='text-gray-400'>Price:</span> Rs.{" "}
                      {car.price.toLocaleString()}
                    </p>
                  </div>

                  <div className='w-full flex justify-between'>
                    <button
                      onClick={() => handleEditClick(car._id)}
                      className=' cursor-pointer px-3 py-2  bg-[#1DCD9F] text-black font-semibold rounded-xl hover:bg-[#17b58b] transition-all duration-300 flex gap-1.5 justify-center items-center'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        x='0px'
                        y='0px'
                        width='20'
                        height='20'
                        viewBox='0 0 50 50'
                      >
                        <path d='M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z'></path>
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(car._id)}
                      className=' cursor-pointer px-3 py-2  bg-[#ca2b2b] text-black font-semibold rounded-xl hover:bg-[#ff0000] transition-all duration-300 flex gap-1.5 justify-center items-center'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        x='0px'
                        y='0px'
                        width='20'
                        height='20'
                        viewBox='0 0 30 30'
                      >
                        <path d='M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z'></path>
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {editModalOpen && editCarData && (
                <div className='fixed inset-0 overflow-auto bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 px-4'>
                  <div className='bg-[#1e1e1e] text-white rounded-2xl p-6 w-full max-w-xl shadow-xl animate-scaleIn max-h-[90vh] overflow-y-auto'>
                    <h2 className='text-2xl font-bold mb-4'>Edit Car</h2>

                    <div className='mb-4'>
                      <label className='block text-sm mb-1'>Image</label>
                      {editCarData.images?.[0] ? (
                        <img
                          src={editCarData.images[0]}
                          alt='Car'
                          className='w-full h-40 object-cover rounded-lg mb-2'
                        />
                      ) : (
                        <div className='w-full h-40 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400'>
                          No Image
                        </div>
                      )}
                      <input
                        type='file'
                        accept='image/*'
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setEditCarData({
                                ...editCarData,
                                images: [reader.result],
                              });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className='w-full mt-2 text-sm text-gray-400 file:bg-[#2a2a2a] file:border file:border-gray-600 file:rounded-md file:text-white file:px-4 file:py-2 file:cursor-pointer'
                      />
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      {[
                        { label: "Make", key: "make", type: "text" },
                        { label: "Model", key: "model", type: "text" },
                        { label: "Year", key: "year", type: "number" },
                        { label: "Color", key: "color", type: "text" },
                        { label: "Engine", key: "engine", type: "text" },
                        { label: "Fuel", key: "fuel", type: "text" },
                        {
                          label: "Transmission",
                          key: "transimission",
                          type: "text",
                        },
                        { label: "Trim", key: "trim", type: "text" },
                        {
                          label: "Mileage (km)",
                          key: "mileage",
                          type: "number",
                        },
                        { label: "Price (Rs.)", key: "price", type: "number" },
                      ].map(({ label, key, type }) => (
                        <div key={key}>
                          <label className='block text-sm mb-1'>{label}</label>
                          <input
                            type={type}
                            value={editCarData[key] || ""}
                            onChange={(e) =>
                              setEditCarData({
                                ...editCarData,
                                [key]:
                                  type === "number"
                                    ? Number(e.target.value)
                                    : e.target.value,
                              })
                            }
                            className='w-full p-2 bg-[#2a2a2a] border border-gray-600 rounded-md text-white placeholder-gray-400'
                            placeholder={label}
                          />
                        </div>
                      ))}
                    </div>

                    <div className='mt-4'>
                      <label className='block text-sm mb-1'>Description</label>
                      <textarea
                        value={editCarData.description}
                        onChange={(e) =>
                          setEditCarData({
                            ...editCarData,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                        className='w-full p-2 bg-[#2a2a2a] border border-gray-600 rounded-md text-white placeholder-gray-400'
                        placeholder='Description'
                      />
                    </div>

                    <div className='flex justify-end gap-3 mt-6'>
                      <button
                        onClick={() => setEditModalOpen(false)}
                        className='px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white transition'
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          updateCar(editCarData, editCarData._id)
                            .then(() => {
                              toast.success("Car updated successfully");
                              setEditModalOpen(false);
                              return getCars();
                            })
                            .then((updatedCars) => setCars(updatedCars))
                            .catch((err) => {
                              toast.error("Failed to update car");
                              console.error(err);
                            });
                        }}
                        className='px-4 py-2 rounded-md bg-[#1DCD9F] hover:bg-[#17b58b] text-black font-semibold transition'
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {showDialog && (
                <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50'>
                  <div className='bg-white/80 rounded-2xl p-6 w-[300px] shadow-xl animate-scaleIn'>
                    <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                      Confirm Deletion
                    </h2>
                    <p className='text-gray-700 mb-6'>
                      Are you sure you want to delete this car?
                    </p>
                    <div className='flex justify-end gap-3'>
                      <button
                        onClick={cancelDelete}
                        className=' cursor-pointer px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 transition'
                      >
                        Cancel
                      </button>
                      <button
                        onClick={confirmDelete}
                        className='px-4 py-2 cursor-pointer rounded-md bg-red-600 hover:bg-red-700 text-white transition'
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cars;
