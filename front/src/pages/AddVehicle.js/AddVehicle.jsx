import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './AddVehicle.css';

const AddVehicle = () => {
  const [vehicle, setVehicle] = useState({
    plate: '',
    type: '',
    Document: '',
    NumeroDocument: '',
    user: ''
  });

  const history = useHistory();

  const handleChange = e => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/vehicles', [vehicle])
      .then(() => history.push('/'))
      .catch(err => console.error(err));
  };

  return (
    <div className="add-vehicle">
      <h1>Add Vehicle</h1>
      <form onSubmit={handleSubmit}>
        <input name="plate" placeholder="Plate" value={vehicle.plate} onChange={handleChange} required />
        <select name="type" value={vehicle.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="car">Car</option>
          <option value="motorcycle">Motorcycle</option>
        </select>
        <select name="Document" value={vehicle.Document} onChange={handleChange} required>
          <option value="">Select Document Type</option>
          <option value="cedula">Cedula</option>
          <option value="pasaporte">Pasaporte</option>
        </select>
        <input name="NumeroDocument" placeholder="Numero Document" value={vehicle.NumeroDocument} onChange={handleChange} required />
        <input name="user" placeholder="User" value={vehicle.user} onChange={handleChange} required />
        <button type="submit" className="btn">Add Vehicle</button>
      </form>
    </div>
  );
};

export default AddVehicle;
