import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import React, {useState, useCallback} from 'react';
import style from "./LocationSearch.module.css";
import Button from "react-bootstrap/Button";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const apiURL = `${API_BASE_URL}/google/nearbyStores`;
const containerStyle = {
  width: '1920px',
  height: '1080px',
};
const markers = [];
var allow = false;

function LocationSearch(){
  const [map, setMap] = useState(null);
  const [lat, setLat] = useState(-36.8618);
  const [lng, setLng] = useState(174.7696);
  const [allowed, setAllowed] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${API_KEY}`,
    libraries: ['places'],
  });

  navigator.geolocation.getCurrentPosition((position) => {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  });

  const setAllow = () => {
    allow = true;
    setAllowed(true);
  }

  const onLoad = useCallback(async function onLoad(map){
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    });
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
    setMap(map);
  }, [lat, lng])
      return allow ? (isLoaded ? (<GoogleMap
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
        </GoogleMap>)
      : <>Map is Loading</>) : <div className={style.center}><p>Make Sure to Allow Location Before Clicking Okay!</p><Button className={style.button} onClick={setAllow}>Okay!</Button></div>
}

export default LocationSearch;