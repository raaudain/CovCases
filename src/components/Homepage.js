import React, { useState, useEffect, useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { fetchData } from "../api";

import CovidCases from "./CovidCases";
import Header from "./Header";
import LocateMe from "./LocateMe";

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
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      {!data ? (
        <div>Loading...</div>
      ) : (
        <>
          <Header panTo={panTo} />
          <LocateMe panTo={panTo} />
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
            {/* Loops through each click and displays marker */}
            {marker.map((click) => (
              <Marker
                key={click.time.toISOString()}
                position={{ lat: click.lat, lng: click.lng }}
                icon={{
                  scaledSize: new window.google.maps.Size(30, 30),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(0, 0),
                }}
                onClick={() => setSelected(marker)}
              />
            ))}

            {selected ? (
              <InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => {
                  setSelected(null);
                }}
              >
                <div>
                  <p>Virus</p>
                </div>
              </InfoWindow>
            ) : null}
          </GoogleMap>
        </>
      )}
    </div>
  );
}
