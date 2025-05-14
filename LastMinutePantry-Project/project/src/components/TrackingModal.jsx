import { useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY'; // Replace with your API key
