import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/BridgeForm.css';

const BridgeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bridge, setBridge] = useState({
    name: '',
    latitude: '',
    longitude: '',
    inspection_date: '',
    status: 'Good',
    traffic_load: ''
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/bridges/${id}/`)
        .then(response => {
          const data = response.data;
          setBridge({
            name: data.name,
            latitude: data.location.coordinates[1],
            longitude: data.location.coordinates[0],
            inspection_date: data.inspection_date,
            status: data.status,
            traffic_load: data.traffic_load
          });
        })
        .catch(error => {
          console.error('There was an error fetching the bridge details!', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBridge({ ...bridge, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      name: bridge.name,
      location: {
        type: 'Point',
        coordinates: [parseFloat(bridge.longitude), parseFloat(bridge.latitude)]
      },
      inspection_date: bridge.inspection_date,
      status: bridge.status,
      traffic_load: parseInt(bridge.traffic_load)
    };

    if (!['Good', 'Fair', 'Poor', 'Bad'].includes(bridge.status)) {
      console.warn('Invalid status selected. Defaulting to "Good"');
      formattedData.status = 'Good';
    }

    if (id) {
      axios.put(`http://localhost:8000/api/bridges/${id}/`, formattedData)
        .then(() => {
          navigate('/');
        })
        .catch(error => {
          console.error('There was an error updating the bridge!', error);
        });
    } else {
      axios.post('http://localhost:8000/api/bridges/', formattedData)
        .then(() => {
          navigate('/');
        })
        .catch(error => {
          console.error('There was an error creating the bridge!', error);
        });
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? 'Update a Bridge' : 'Add a new Bridge'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={bridge.name} onChange={handleChange} required />
        </label>
        <label>
          Latitude:
          <input type="number" name="latitude" value={bridge.latitude} onChange={handleChange} required />
        </label>
        <label>
          Longitude:
          <input type="number" name="longitude" value={bridge.longitude} onChange={handleChange} required />
        </label>
        <label>
          Inspection Date:
          <input type="date" name="inspection_date" value={bridge.inspection_date} onChange={handleChange} required />
        </label>
        <label>
          Status:
          <select name="status" value={bridge.status} onChange={handleChange} required>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
            <option value="Bad">Bad</option>
          </select>        
        </label>
        <label>
          Traffic Load (Tons):
          <input type="number" name="traffic_load" value={bridge.traffic_load} onChange={handleChange} required />
        </label>
        <button type="submit">{id ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};

export default BridgeForm;
