import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import BridgeList from './components/BridgesList';
import BridgeStats from './components/BridgeStats';
import BridgeForm from './components/BridgeForm';
import BridgeDetails from './components/BridgeDetails';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="App-nav">
        <ul>
        <img src="https://uploads-ssl.webflow.com/62cebd722b272fd1c0433456/62cec52b6cd1ec2106934953_eonsight%20logo%20white.svg" className="App-logo" alt="logo" />
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add">New Bridge</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={
          <>

            <BridgeList />
            <BridgeStats />
            
          </>
        } />
        <Route path="/add" element={<BridgeForm />} />
        <Route path="/bridge/:id" element={<BridgeDetails />} />
        <Route path="/edit/:id" element={<BridgeForm />} />
      </Routes>
    </div>
  );
}

export default App;
