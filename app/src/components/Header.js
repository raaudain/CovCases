import React from 'react';
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";


export default function Header() {

    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
        requestOptions: {
            location: {
                lat: () => 37.090240,
                lng: () => -95.712891
            },
            radius: 200 * 1609.34,
        }
    });

    console.log(ready)

    return (
        <div className="header">
            <div className="logo">CovCases</div>
            {/* <div className="input"><input placeholder="Enter location" /></div> */}
            <div className="search">
                <Combobox onSelect={location => console.log(location)} >
                    <ComboboxInput 
                        value={value} 
                        onChange={e => setValue(e.target.value)}
                        disabled={!ready}
                        placeholder="Enter location"
                    />
                    <ComboboxPopover>
                        {status === "OK" && data.map(({id, description}) => (<ComboboxOption key={id} value={description} />)
                        )}
                    </ComboboxPopover>
                </Combobox>
            </div>

        </div>
    )
}