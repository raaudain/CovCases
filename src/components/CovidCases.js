import React from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import icon from "../img/red-circle.png";

export default function CovidCases({ data, selected, setSelected }) {
  // Handles resource overload
  const hashTable = {};

  for (let x in data) {
    hashTable[x] = data[x];
  }

  return (
    <>
      {Object.values(hashTable).map((e, index) => {
        return (
          <>
          <Marker
            key={index}
            position={{ lat: parseInt(e.latitude), lng: parseInt(e.longitude) }}
            icon={{
              url: icon,
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(55, 40),
            }}
            onClick={() => {setSelected(e)}}
          >
            {selected === e ? (<InfoWindow position={{ lat: parseInt(e.latitude), lng: parseInt(e.longitude) }} onCloseClick={() => setSelected(null)}>
              <div className="infoBox">
                <h3>{e.county} County, {e.state}</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Confirmed</th>
                      <th>Deaths</th>
                      <th>Recovered</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{e.confirmed}</td>
                      <td>{e.deaths}</td>
                      <td>{e.recovered}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </InfoWindow>) : null}
          </Marker>
          </>
        );
      })}
    </>
  );
}
