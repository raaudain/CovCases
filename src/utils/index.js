import React, {useCallback, useRef} from "react";

export const onMapClick = useCallback(e => 
    setMarker(currentClick => [...currentClick, {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
    }]
), []);

export const panTo = useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng});
    mapRef.current.setZoom(13.5);
}, []);

export const mapRef = useRef(); // Retains state without causing rerenders

export const onMapLoad = useCallback(map => mapRef.current = map, []);

export const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
})