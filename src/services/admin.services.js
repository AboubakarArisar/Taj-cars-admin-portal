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

export const createCar = async (carData) => {};

export const Login = async (adminData) => {
  try {
    const response = await instance.post("/api/admin/signin", adminData);
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};
