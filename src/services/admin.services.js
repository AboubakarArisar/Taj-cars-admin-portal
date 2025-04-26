import axios from "axios";
export const instance = axios.create({
  baseURL:
    import.meta.env.VITE_PUBLIC_MAIN_SERVER_URL ||
    import.meta.env.VITE_PUBLIC_MAIN_SERVER_URL ||
    "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCars = async () => {
  try {
    const response = await instance.get("/api/car/");
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

export const addCar = async (carData) => {
  try {
    const response = await instance.post("/api/car/", carData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding car:", error);
    throw error;
  }
};

export const Login = async (adminData) => {
  try {
    const response = await instance.post("/api/admin/signin", adminData);
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

export const CountCars = async () => {
  try {
    const response = await instance.get("/api/car/count");
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

export const deleteCar = async (carId) => {
  try {
    const response = await instance.delete(`/api/car/${carId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

export const updateCar = async (carData, carId) => {
  try {
    const response = await instance.put(`/api/car/${carId}`, carData);
    return response.data;
  } catch (error) {
    console.error("Error updating the car", error.message);
    throw error;
  }
};

export const getCarById = async (carId) => {
  try {
    const response = await instance.get(`/api/car/${carId}`);
    return response.data;
  } catch (error) {
    console.error("Error updating the car", error.message);
    throw error;
  }
};

export const getAllContact = async () => {
  try {
    const response = await instance.get("/api/contact/");
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};
