import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Cars from "./pages/Cars";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/404";
import AddCar from "./pages/AddCar";
import ViewContact from "./pages/ViewContact";
import SingleMessage from "./pages/SingleMessage";
import ProtectedRoute from "./Components/ProtectedRoute";
import Logout from "./Components/Logout";

const AppRouter = () => {
  return (
    <div>
      <Router>
        <div className='min-h-screen bg-[#0f0e17]'>
          <Routes>
            {/* Public routes */}
            <Route path='/' element={<App />} />
            <Route path='/logout' element={<Logout />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/cars' element={<Cars />} />
              <Route path='/add/car' element={<AddCar />} />
              <Route path='/view/contacts' element={<ViewContact />} />
              <Route path='/message/:messageId' element={<SingleMessage />} />
            </Route>

            {/* Fallback */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default AppRouter;
