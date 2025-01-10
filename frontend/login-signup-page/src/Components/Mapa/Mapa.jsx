import React, { useEffect } from 'react';
import './Mapa.css';

const Mapa = () => {
  useEffect(() => {
    // Inicijalizacija mape i pretraživanja
    const initMap = () => {
      const location = { lat: 45.813, lng: 15.977 }; // Koordinate Zagreba
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 12,
        mapId: "8ff5638c959da6bd",
      });

      // Dodavanje markera na početnu poziciju
      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: location,
      });

      // Inicijalizacija searchBox-a
      const input = document.getElementById("search-input");
      const searchBox = new window.google.maps.places.SearchBox(input);

      // Event listener za promjenu u searchBox-u
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        
        if (places.length === 0) return;

        // Postavi mapu na prvo mjesto koje je pronađeno
        const place = places[0];
        if (!place.geometry || !place.geometry.location) return;

        map.setCenter(place.geometry.location);
        map.setZoom(15);

        // Premjesti marker na novo mjesto
        marker.position = place.geometry.location;
      });
    };

    // Učitavanje Google Maps i Places API-ja
    const loadScript = () => {

      if (document.getElementById("google-maps-script") || window.google.maps) {
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBsWBxoR7Gv0bHql8TzVisUH4pWf0XRRpI&loading=async&libraries=places,marker&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = initMap; // Inicijalizacija mape
      document.head.appendChild(script);
    };

    loadScript();
  }, []);

  return (
    <div className='mapa'>
      <div className="mapa-left">
        {/* Mjesto za mapu */}
        <div id="map" style={{ height: "500px", width: "100%" }}></div>
      </div>
      <div className="mapa-right">
        <h3>INTERAKTIVNA MAPA GRADA ZAGREBA</h3>
        <h2>Uz pomoć mape, sada se još lakše možeš kretati gradom.</h2>
        {/* Polje za pretraživanje */}
        <input
          id="search-input"
          type="text"
          placeholder="Pretraži lokacije..."
          style={{ width: "100%", padding: "10px", marginTop: "20px" }}
        />
      </div>
    </div>
  );
};

export default Mapa;
