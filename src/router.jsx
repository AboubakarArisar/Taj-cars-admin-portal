import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";

const AppRouter = () => {
  return (
    <div>
      <Router>
        <div className='min-h-screen bg-[#0f0e17]'>
          <Routes>
            <Route path='/' element={<App />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default AppRouter;
