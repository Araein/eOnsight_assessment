import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './css/BridgesDetails.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const BridgeDetails = () => {
  const { id } = useParams();
  const [bridge, setBridge] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/bridges/${id}/`)
      .then(response => {
        setBridge(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the bridge details!', error);
      });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:8000/api/bridges/${id}/`)
      .then(() => {
        console.log('Bridge deleted successfully');
        setRedirect(true);
      })
      .catch(error => {
        console.error('Error deleting bridge!', error);
      });
  };

  const parseLocation = (location) => {
    if (!location || !location.coordinates) return 'N/A';
    const [longitude, latitude] = location.coordinates;
    return `${latitude}, ${longitude}`;
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  if (!bridge) return <div>Loading...</div>;

  return (
    <div className="bridge-details">
      <h2 className="bridge-name">{bridge.name}</h2>
      <div className="bridge-details-container">
        <div className="info-container">
          <div className="info-row">
            <p className="subtitle">Location</p>
            <p className="info-value">{parseLocation(bridge.location)}</p>
          </div>
          <div className="info-row">
            <p className="subtitle">Inspection Date</p>
            <p className="info-value">{bridge.inspection_date}</p>
          </div>
          <div className="info-row">
            <p className="subtitle">Status</p>
            <p className="info-value">{bridge.status}</p>
          </div>
          <div className="info-row">
            <p className="subtitle">Traffic Load</p>
            <p className="info-value">{bridge.traffic_load}</p>
          </div>
          <div className="action-buttons">
           <Link to={`/edit/${bridge.id}`} className="edit-button">Edit Bridge</Link>
                    
          <button className="delete-button" onClick={handleDelete}>Delete Bridge</button>
          </div>
        </div>
        <div className="map-container">
          <MapContainer center={[bridge.location.coordinates[1], bridge.location.coordinates[0]]} zoom={13}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[bridge.location.coordinates[1], bridge.location.coordinates[0]]}>
              <Popup>
                {bridge.name}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default BridgeDetails;
