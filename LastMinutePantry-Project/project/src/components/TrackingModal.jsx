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

    directionsService.route(
      {
        origin: pickupCoords,
        destination: dropoffCoords,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        }
      }
    );
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Track Delivery #{delivery.id}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-600">Pickup Location</p>
                <p className="font-medium">{delivery.pickup}</p>
              </div>
              <div>
                <p className="text-gray-600">Dropoff Location</p>
                <p className="font-medium">{delivery.dropoff}</p>
              </div>
            </div>

            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={defaultCenter}
                zoom={12}
                onLoad={onLoad}
              >
                {directions && (
                  <DirectionsRenderer
                    directions={directions}
                    options={{
                      polylineOptions: {
                        strokeColor: '#22C55E',
                        strokeWeight: 5,
                      },
                    }}
                  />
                )}
              </GoogleMap>
            </LoadScript>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-800">
              Estimated arrival time: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}