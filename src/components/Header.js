import React from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, } from "@reach/combobox";

import LocateMe from "./LocateMe";

export default function Header({ panTo }) {
  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 37.09024, lng: () => -95.712891 },
      radius: 200 * 1609.34,
    },
  });

  const handleSelect = async (address) => {
    setValue(address, false);
            clearSuggestions();

            try {
              const results = await getGeocode({ address });
              const { lat, lng } = await getLatLng(results[0]);
              panTo({ lat, lng });
            } catch (err) {
              console.error(err);
            }
  }

  return (
    <div className="header">
      <div className="logo"><a href="/">CovCases</a></div>
      {/* <div className="input"><input placeholder="Enter location" /></div> */}
      <div className="search">
        <Combobox onSelect={handleSelect} className="combobox">
          <ComboboxInput
            className="searchInput"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready}
            placeholder="Enter location"
          />
          <ComboboxPopover>
            <ComboboxList className="resultsList">
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption className="result" key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
        <LocateMe panTo={panTo} />
      </div>
    </div>
  );
}
