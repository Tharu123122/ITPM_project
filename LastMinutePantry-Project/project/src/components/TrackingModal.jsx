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