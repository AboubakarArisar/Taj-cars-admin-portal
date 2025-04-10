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
  const formData = new FormData();

  formData.append("name", carData.name);
  formData.append("model", carData.model);
  formData.append("year", carData.year);
  formData.append("price", carData.price);
  formData.append("mileage", carData.mileage);
  formData.append("engine", carData.engine);
  formData.append("color", carData.color);
  formData.append("stock_quantity", carData.stock_quantity);
  formData.append("description", carData.description);

  carData.images.forEach((image) => {
    formData.append("images", image);
  });

  try {
    const response = await instance.post("/api/car/", formData, {
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
