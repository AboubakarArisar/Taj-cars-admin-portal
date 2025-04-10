import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Cars from "./pages/Cars";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/404";
import AddCar from "./pages/AddCar";

const AppRouter = () => {
  return (
    <div>
      <Router>
        <div className='min-h-screen bg-[#0f0e17]'>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/cars' element={<Cars />} />
            <Route path='/add/car' element={<AddCar />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default AppRouter;
