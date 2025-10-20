import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Simple auth check using localStorage
const isAuthenticated = () => {
  try {
    const token = localStorage.getItem("token");
    const admin = JSON.parse(localStorage.getItem("admin") || "null");
    return Boolean(token && admin?.role);
  } catch (e) {
    return false;
  }
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
