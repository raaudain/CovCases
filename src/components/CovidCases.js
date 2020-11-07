import React from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import redDot from "../img/Basic_red_dot.png";

export default function CovidCases({ data, selected, setSelected }) {
  // Handles resource overload
  const hashTable = {};

  for (let x in data) {
    hashTable[x] = data[x];
  }

  // if (selected) console.log(selected.latitude)

  return (
    <>
      {Object.values(hashTable).map((e, index) => {
        return (
          <>
          <Marker
            key={index}
            position={{ lat: parseInt(e.latitude), lng: parseInt(e.longitude) }}
            icon={{
              // url: redDot,
              scaledSize: new window.google.maps.Size(3, 3),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(0, 0),
            }}
            // Have to use console to display information since InfoWindow isn't working
            onMouseOver={() => console.table(e)}
 
          >
          </Marker>
          
          
            {selected ? (<InfoWindow position={{ lat: parseInt(selected.latitude), lng: parseInt(selected.longitude) }} onMouseLeave={() => setSelected(null)}><div>Hey</div></InfoWindow>) : null}
          
          </>
        );
      })}
    </>
  );
}
