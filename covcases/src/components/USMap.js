import React, {useState, useEffect} from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import WY from "../styles/WY"

export default function USMap() {
    const [marker, setMarker] = useState([]);

    const libraries = ["places"];
    const mapContainerStyle = {
        width: "100vw",
        height: "100vh",
    }
    const center = {
        lat: 37.090240,
        lng: -95.712891,
    }
    const options = {
        styles: WY,
        disableDefaultUI: true,
        zoomControl: true,
    }

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyDJoNMG3OXLKQfMpvgFoyO-w-urTSq3dWc",
        libraries,
    })

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    console.log(process.env)

    return (
        <div>
            <GoogleMap 
                mapContainerStyle={mapContainerStyle} 
                zoom={5} 
                center={center}
                options={options}
                onClick={e => setMarker(current => [...current, {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                    time: new Date(),
                }]
                )}
            >
                {marker.map(mark => <Marker key={marker.time.toISOString()} />)}
            </GoogleMap>
        </div>
    )
}