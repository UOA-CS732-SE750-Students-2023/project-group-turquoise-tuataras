import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import React, {useState, useCallback} from 'react';

const containerStyle = {
  width: '1200px',
  height: '800px'
};

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
    query: 'supermarket',
    fields:['name', 'geometry'],
    locationBias: {
      lat: lat,
      lng: lng,
      radius: '3000'
    }
  };
  
  const onLoad = useCallback(function onLoad(map){
    var service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, function(results, status){
      for (var i = 0; i < results.length; i++) {
        console.log(results[i]);
      }
    });
  })
  
      return (
          isLoaded&&<GoogleMap
            mapContainerStyle={containerStyle}
            center={{lat: lat, lng: lng}}
            zoom={10}
            onLoad={onLoad}
          >
              <MarkerF position={{lat: lat, lng: lng}}/>
          </GoogleMap>
      );
}

export default LocationSearch;