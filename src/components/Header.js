import React from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, } from "@reach/combobox";

export default function Header({ panTo }) {
  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 37.09024, lng: () => -95.712891 },
      radius: 200 * 1609.34,
    },
  });

  return (
    <div className="header">
      <div className="logo">CovCases</div>
      {/* <div className="input"><input placeholder="Enter location" /></div> */}
      <div className="search">
        <Combobox
          onSelect={async (address) => {
            setValue(address, false);
            clearSuggestions();

            try {
              const results = await getGeocode({ address });
              const { lat, lng } = await getLatLng(results[0]);
              panTo({ lat, lng });
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <ComboboxInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready}
            placeholder="Enter location"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
    </div>
  );
}
