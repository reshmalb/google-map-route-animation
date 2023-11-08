import React,{useState,useEffect} from 'react'
import {GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api'

const MapDisplay = () => {
    const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

    // console.log(process.env.REACT_APP_GOOGLE_MAP_API_KEY)
    const [directions, setDirections] = useState(null);
  
    const mapSize = {
      height: '400px',
      width: '100%',
    };
  
    const initialPosition = {
      lat: 20.5937,
      lng: 78.9629,
    };
  
    useEffect(() => {
      // Create a function to initialize the Google Maps API and set directions
      const initMap = () => {
        const directionService = new window.google.maps.DirectionsService();
        const directionRenderer = new window.google.maps.DirectionsRenderer();
  
        const startLocation = new window.google.maps.LatLng(18.9750, 72.8258);
        const endLocation = new window.google.maps.LatLng(19.0760, 72.8777);
  
        const mapRequest = {
          origin: startLocation,
          destination: endLocation,
          travelMode: window.google.maps.TravelMode.WALKING,
        };
  
        directionService.route(mapRequest, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            directionRenderer.setDirections(result);
            setDirections(result); // Save the directions data in state
          }
        });
      };
  
      // Check if the Google Maps API has already loaded
      if (window.google && window.google.maps) {
        initMap(); // Initialize the map if it's already available
      } else {
        // If the API is not available, wait for it to load
        window.initMap = initMap; // Initialize the map once the API is loaded
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;
        document.body.appendChild(script);
      }
    }, [API_KEY]);
  
    return (
      <div>
        <LoadScript googleMapsApiKey={API_KEY}>
          <GoogleMap mapContainerStyle={mapSize} zoom={15} center={initialPosition}>
            {directions && (
              <DirectionsRenderer
                options={{
                  directions,
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    );
  };
  
  export default MapDisplay;