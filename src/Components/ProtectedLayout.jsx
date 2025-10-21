import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LogoutButton } from "./LogoutFixed";

const ProtectedLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#111827] text-white">
      <header className="w-full border-b border-gray-700 bg-[#0b1220]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/dashboard')}>
            Admin Panel
          </h1>
          <LogoutButton className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold transition-all" />
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
