import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VehicleList from './pages/vehicleList/vehicleList.jsx';
import AddVehicle from './pages/AddVehicle/AddVehicle.jsx';
import UpdateVehicle from './pages/UpdateVehicle/UpdateVehicle.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VehicleList />} />
        <Route path="/add" element={<AddVehicle />} />
        <Route path="/update/:id" element={<UpdateVehicle />} />
      </Routes>
    </Router>
  );
}

export default App;
