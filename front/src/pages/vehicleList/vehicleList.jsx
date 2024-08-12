import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './vehicleList.css';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios.get('/api/vehicles')
      .then(res => setVehicles(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="vehicle-list">
      <h1>Vehicles</h1>
      <Link to="/add" className="btn">Add Vehicle</Link>
      <table>
        <thead>
          <tr>
            <th>Plate</th>
            <th>Type</th>
            <th>Document</th>
            <th>NumeroDocument</th>
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(vehicle => (
            <tr key={vehicle._id}>
              <td>{vehicle.plate}</td>
              <td>{vehicle.type}</td>
              <td>{vehicle.Document}</td>
              <td>{vehicle.NumeroDocument}</td>
              <td>{vehicle.user}</td>
              <td>
                <Link to={`/update/${vehicle._id}`} className="btn">Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleList;
