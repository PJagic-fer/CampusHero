import React, { useCallback, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';
import './Mapa.css';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 45.813,
  lng: 15.977,
};

const libraries = ['places'];

const Mapa = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCcoADX99NnzkEk8scoulYCsi22yAAdi0Y',
    // @ts-ignore
    libraries: libraries,
  });

  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [searchBox, setSearchBox] = useState(null);
  const [centerMarkerPosition, setCenterMarkerPosition] = useState(center);

  const onLoadMap = useCallback((mapInstance) => {
    setMap(mapInstance);

    const updateCenterMarker = () => {
      const center = mapInstance.getCenter();
      setCenterMarkerPosition({
        lat: center.lat(),
        lng: center.lng(),
      });
    };

    mapInstance.addListener('center_changed', updateCenterMarker);
  }, []);

  const onLoadSearchBox = useCallback((searchBoxInstance) => {
    setSearchBox(searchBoxInstance);
  }, []);

  const onPlacesChanged = useCallback(() => {
    if (!searchBox) return;

    const places = searchBox.getPlaces();
    if (places.length === 0) return;

    const place = places[0];
    if (!place.geometry || !place.geometry.location) return;

    const location = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };

    setMarkerPosition(location);
    map.panTo(location);
    map.setZoom(15);
  }, [map, searchBox]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mapa' id='mapa'>
      <div className="mapa-left">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onLoad={onLoadMap}
        >
          <Marker position={markerPosition} />
        </GoogleMap>
      </div>
      <div className="mapa-right">
        <h3>INTERAKTIVNA MAPA GRADA ZAGREBA</h3>
        <h2>Uz pomoć mape, sada se još lakše možeš kretati gradom.</h2>
        <StandaloneSearchBox
          onLoad={onLoadSearchBox}
          onPlacesChanged={onPlacesChanged}
        >
          <input
            id="search-input"
            type="text"
            placeholder="Pretraži lokacije..."
            style={{ width: '100%', padding: '10px', marginTop: '20px' }}
          />
        </StandaloneSearchBox>
      </div>
    </div>
  );
};

export default Mapa;
