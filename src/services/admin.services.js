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

// Attach token to requests if available
instance.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    // If no token, block protected API calls (allowlist auth endpoints)
    const isAuthPath = (config.url || "").includes("/api/admin/signin");
    if (!token && !isAuthPath) {
      return Promise.reject({
        message: "Not authenticated",
        isAuthError: true,
        config,
      });
    }
  } catch (_) {}
  return config;
});

// Auto-logout on 401/403
instance.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403 || error?.isAuthError) {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
      } finally {
        // Force navigation if running in browser context
        if (typeof window !== "undefined") {
          window.location.replace("/");
        }
      }
    }
    return Promise.reject(error);
  }
);

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

export const deleteContact = async (contactId) => {
  try {
    const response = await instance.delete(`/api/contact/${contactId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

export const markAllAsRead = async () => {
  try {
    const response = await instance.put(`/api/contact/all/read`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

export const getContact = async (contactId) => {
  try {
    const response = await instance.get(`/api/contact/${contactId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};
