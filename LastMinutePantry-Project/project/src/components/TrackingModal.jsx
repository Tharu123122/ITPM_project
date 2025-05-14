import { useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY'; // Replace with your API key

const containerStyle = {
  width: '100%',
  height: '400px'
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060
};

export function TrackingModal({ isOpen, onClose, delivery }) {
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    setMap(map);
    // Calculate and display route
    const directionsService = new google.maps.DirectionsService();
    
    // Mock coordinates - replace with actual geocoding in production
    const pickupCoords = { lat: 40.7128, lng: -74.0060 }; // New York
    const dropoffCoords = { lat: 40.7614, lng: -73.9776 }; // Manhattan
