import React, {useState, useEffect, useCallback, useRef} from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import WY from "../styles/WY"
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, ComboboxButton} from "@reach/combobox";

export default function USMap() {
    const [marker, setMarker] = useState([]);
    const [selected, setSelected] = useState(null);

    const onMapClick = useCallback(e => 
        setMarker(currentClick => [...currentClick, {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            time: new Date(),
        }]
    ), []);

    const panTo = useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(13.5);
    }, []);

    const mapRef = useRef(); // Retains state without causing rerenders
    const onMapLoad = useCallback(map => mapRef.current = map, []);

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
        //styles: WY,
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
        <Header panTo={panTo} />
        <Locate panTo={panTo} />
            <GoogleMap 
                mapContainerStyle={mapContainerStyle} 
                zoom={5} 
                center={center}
                options={options}
                // Sets each click as coordinates on map. Time used as keyID
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {/* Loops through each click and displays marker */}
                {marker.map(click => 
                    <Marker 
                        key={click.time.toISOString()} 
                        position={{
                            lat: click.lat, 
                            lng: click.lng,
                        }}
                        icon={{
                            scaledSize: new window.google.maps.Size(30,30),
                            origin: new window.google.maps.Point(0,0),
                            anchor: new window.google.maps.Point(0,0),
                        }}
                        onClick={() => {
                            setSelected(marker);
                        }} 
                    />
                )}

                {selected ? (<InfoWindow 
                    position={{lat: selected.lat, lng: selected.lng}} 
                    onCloseClick={() => {
                        setSelected(null);
                    }} >
                    <div>
                        <p>Virus</p>
                    </div>
                </InfoWindow>) : null}
            </GoogleMap>
        </div>
    )
}

function Locate({panTo}) {
    return <button className="locate" onClick={() => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        }, () => null);
        
    }}>
        <img src="" alt="compass"></img>
    </button>
}

function Header({panTo}) {

    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
        requestOptions: {
            location: {
                lat: () => 37.090240,
                lng: () => -95.712891
            },
            radius: 200 * 1609.34,
        }
    });


    return (
        <div className="header">
            <div className="logo">CovCases</div>
            {/* <div className="input"><input placeholder="Enter location" /></div> */}
            <div className="search">
                <Combobox onSelect={async address => {
                    setValue(address, false);
                    clearSuggestions();

                    try {
                        const results = await getGeocode({address});
                        const {lat, lng} = await getLatLng(results[0])
                        panTo({lat, lng});
                    } catch(error) {
                        console.log("error!")
                    }
                    //console.log(location)
                }} >
                    <ComboboxInput 
                        value={value} 
                        onChange={e => setValue(e.target.value)}
                        disabled={!ready}
                        placeholder="Enter location"
                    />
                    <ComboboxPopover>
                        <ComboboxList>

                        {status === "OK" && data.map(({id, description}) => (<ComboboxOption key={id} value={description} />)
                        )}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>
            </div>

        </div>
    )
}