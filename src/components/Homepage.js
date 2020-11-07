import React, { useState, useEffect, useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { fetchData } from "../api";

import CovidCases from "./CovidCases";
import Header from "./Header";

import * as theme from "../styles";

export default function Homepage() {
  const [marker, setMarker] = useState([]);
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState({});

  useEffect(async () => {
    const response = await fetchData();
    setData(response);
  }, []);

  const onMapClick = useCallback((e) =>
    setMarker((currentClick) => [
        ...currentClick,
        {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          time: new Date(),
        },
      ]),
    []
  );

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(13.5);
  }, []);

  const mapRef = useRef(); // Retains state without causing rerenders
  const onMapLoad = useCallback((map) => (mapRef.current = map), []);

  const libraries = ["places"];

  const mapContainerStyle = { width: "100vw", height: "100vh" };
  const center = { lat: 37.09024, lng: -95.712891 };
  const options = {
    styles: theme.Modest,
    disableDefaultUI: true,
    zoomControl: true,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className="container">
      {!data ? (
        <div>Loading...</div>
      ) : (
        <>
          <Header panTo={panTo} />
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={5}
            center={center}
            options={options}
            // Sets each click as coordinates on map. Time used as keyID
            onClick={onMapClick}
            onLoad={onMapLoad}
          >
            <CovidCases data={data} selected={selected} setSelected={setSelected} />
          </GoogleMap>
        </>
      )}
    </div>
  );
}
