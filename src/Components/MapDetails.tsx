import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet's CSS

// Functional component for setting map center
const CenterMap = ({ center }: { center: LatLngExpression }) => {
  const map = useMap();
  map.setView(center);
  return null; // No render necessary, just setting the map center
};

const MapDetail: React.FC = () => {
  const location = useLocation();
  console.log(location);
  
  const { latitude, longitude } = location.state || {};

  if (!latitude || !longitude) {
    return <div>Invalid location data</div>;
  }

  return (
    <div>
      {/* Map Container with Background */}
      <div style={{ 
        height: '80vh', 
        width: '80vw', 
        display: 'flex', 
        alignItems: 'center', 
        marginTop:'30px',
        justifyContent: 'center', 
        backgroundColor: '#f0f0f0', 
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}>
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          style={{ width: '100%', height: '100%' }}
        >
          {/* Set map center dynamically */}
          <CenterMap center={[latitude, longitude] as LatLngExpression} />
  
          {/* TileLayer for map tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Marker and Popup for location */}
          <Marker position={[latitude, longitude]}>
            <Popup>
              <strong>Location</strong><br />
              Latitude: {latitude}<br />
              Longitude: {longitude}
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Navigation Bar */}
      <div className="container">
        <nav className='navbar'>
          <div className="nav-heading">Profile Mapping</div>
          <ul className='nav'>
            <li><Link to='/home'>Home</Link></li>
            <li><Link to='/profile'>Profile List</Link></li>
            <li><Link to='/admin'>Admin</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MapDetail;
