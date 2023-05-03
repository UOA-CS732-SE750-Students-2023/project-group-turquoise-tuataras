import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import React, {useState, useCallback} from 'react';

const containerStyle = {
  width: '1200px',
  height: '800px'
};
const markers = [];

function LocationSearch(){
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCLEu_YtuPwWib7dyJSbRWzP0T2KvfAvpc',
    libraries: ['places'],
  });

  navigator.geolocation.getCurrentPosition((position) => {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  });

  const request = {
    type: ['supermarket'],
    location:{
      lat: lat,
      lng: lng,
    },
    radius: '5000'
  };
  
  const onLoad = useCallback(function onLoad(map){
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function(results, status){
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          var marker = new google.maps.Marker({
              map: map,
              position:place.geometry.location,
              title: place.formatted_address,
          });
          markers.push(marker);
        }
      }  
      console.log(status);
      console.log(results);
    });
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