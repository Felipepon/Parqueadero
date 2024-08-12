import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import './UpdateVehicle.css';

const UpdateVehicle = () => {
  const [vehicle, setVehicle] = useState({
    plate: '',
    type: '',
    Document: '',
    NumeroDocument: '',
    user: ''
  });

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios.get(`/api/vehicles/${id}`)
      .then(res => setVehicle(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = e => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`/api/vehicles/${id}`, vehicle)
      .then(() => history.push('/'))
      .catch(err => console.error(err));
  };

  return (
    <div className="update-vehicle">
      <h1>Update Vehicle</h1>
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
        <button type="submit" className="btn">Update Vehicle</button>
      </form>
    </div>
  );
};

export default UpdateVehicle;
