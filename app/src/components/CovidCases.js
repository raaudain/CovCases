import React from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import redDot from "../img/Basic_red_dot.png";

export default function CovidCases({ data, selected, setSelected }) {
  const hashTable = {};

  for (let x in data) {
    hashTable[x] = data[x];
  }

  return (
    <>
      {Object.values(hashTable).map((e, index) => {
        return (
          <Marker
            key={index}
            position={{ lat: parseInt(e.latitude), lng: parseInt(e.longitude) }}
            icon={{
              // url: redDot,
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(0, 0),
            }}
            onClick={() => setSelected(e)}
          >
            {/* {selected ? (<InfoWindow><div>Hey</div></InfoWindow>) : null} */}
          </Marker>
        );
      })}
    </>
  );
}
