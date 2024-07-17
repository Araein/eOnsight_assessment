import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/BridgesList.css';

const BridgesList = () => {
  const [bridges, setBridges] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/bridges/')
      .then(response => {
        const sortedBridges = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setBridges(sortedBridges);
      })
      .catch(error => {
        console.error('There was an error fetching the bridges!', error);
      });
  }, []);

  const parseLocation = (location) => {
    if (!location || !location.coordinates) return 'N/A';
    const [longitude, latitude] = location.coordinates;
    return `${latitude}, ${longitude}`;
  };

  // set colors class for css
  const getStatusColorClass = (status) => {
    switch (status) {
      case 'Good':
        return 'status-good';
      case 'Fair':
        return 'status-fair';
      case 'Poor':
        return 'status-poor';
      case 'Bad':
        return 'status-bad';
      default:
        return '';
    }
  };

  return (
    <div>
      <h2>Bridge Manager</h2>
      <table className="table">
        <thead>
          <tr>
            <th>
              Name <br />
              <span>(click for details)</span>
            </th>
            <th>
              Location<br />
              <span>(latitude, longitude)</span>
            </th>
            <th>Inspection Date</th>
            <th>Status</th>
            <th>
              Traffic Load<br />
              <span>(tons)</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {bridges.map(bridge => (
            <tr key={bridge.id}>
              <td className="hover-effect">
                <Link to={`/bridge/${bridge.id}`}>{bridge.name}</Link>
              </td>
              <td>{parseLocation(bridge.location)}</td>
              <td>{bridge.inspection_date}</td>
              <td className={`${getStatusColorClass(bridge.status)}`}>{bridge.status}</td>
              <td>{bridge.traffic_load}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BridgesList;
