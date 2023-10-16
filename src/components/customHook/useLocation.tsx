import { useState, useEffect } from 'react';

function useCurrentLocation() {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log('Geolocation is not supported by your browser.');
    }
  }, []);

  return location;
}

export default useCurrentLocation;