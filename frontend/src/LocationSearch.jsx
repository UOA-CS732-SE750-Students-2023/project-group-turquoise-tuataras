import React, { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '800px'
};

function LocationSearch() {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
    })
    return (
      <LoadScript
        googleMapsApiKey="AIzaSyCLEu_YtuPwWib7dyJSbRWzP0T2KvfAvpc"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={
                {
                    lat: lat,
                    lng: lng
                }
            }
          zoom={10}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </LoadScript>
    )
}

export default LocationSearch;