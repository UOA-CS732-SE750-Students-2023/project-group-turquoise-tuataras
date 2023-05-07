import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import React, {useState, useCallback} from 'react';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const apiURL = "http://localhost:3000/api/google/nearbyStores";
const containerStyle = {
  width: '1920px',
  height: '1080px',
};
const markers = [];

function LocationSearch(){
  const [lat, setLat] = useState(-36.8618);
  const [lng, setLng] = useState(174.7696);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${API_KEY}`,
    libraries: ['places'],
  });

  navigator.geolocation.getCurrentPosition((position) => {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  });

  const onLoad = useCallback(async function onLoad(map){
    const response = await axios.get(apiURL, {params: {lat:lat, lng:lng}});
    console.log(response);
    for (var i = 0; i < response.data.length; i++) {
      var place = response.data[i];
      var marker = new google.maps.Marker({
          map: map,
          position:place.geometry.location,
          title: place.name,
      });
      markers.push(marker);
    }

  })
      return (
          isLoaded&&<GoogleMap
          mapContainerStyle={containerStyle}
          center={{lat: lat, lng: lng}}
          zoom={10}
          onLoad={onLoad}
        >
          {markers.map(({ id, title, position }) => (
            <MarkerF
              key={id}
              position={position}
            />
          ))}
          <MarkerF key='user' position={{lat: lat, lng: lng}} icon={"/blue-circle.png"}/>
        </GoogleMap>
      );
}

export default LocationSearch;