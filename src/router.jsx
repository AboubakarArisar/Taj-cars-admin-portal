import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Cars from "./pages/Cars";

const AppRouter = () => {
  return (
    <div>
      <Router>
        <div className='min-h-screen bg-[#0f0e17]'>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/cars' element={<Cars />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default AppRouter;
