import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Page component to clear auth and redirect
const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      // sessionStorage.clear(); // if needed
    } finally {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="w-full h-screen flex items-center justify-center text-white">
      <p>Signing you out…</p>
    </div>
  );
};

export default Logout;

// Reusable inline logout button
export const LogoutButton = ({ className = "bg-[#1DCD9F] cursor-pointer hover:bg-[#17b58b] text-black py-2 px-4 rounded-lg font-semibold transition-all" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
    } finally {
      navigate("/", { replace: true });
    }
  };

  return (
    <button onClick={handleLogout} className={className}>
      Logout
    </button>
  );
};
