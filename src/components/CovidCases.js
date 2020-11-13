import React from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import icon from "../img/red-circle.png";

export default function CovidCases({ usData, worldData, selected, setSelected }) {
  // Handles resource overload
  const usHashTable = {};
  const worldHashTable = {};

  for (let x in usData) {
    usHashTable[x] = usData[x];
  }

  for (let x in worldData) {
    worldHashTable[x] = worldData[x]
  }

  return (
    <>
      {Object.values(usHashTable).map((e, index) => {
        return (
          <>
          <Marker
            key={index}
            position={{ lat: parseInt(e.latitude), lng: parseInt(e.longitude) }}
            icon={{
              url: icon,
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {setSelected(e)}}
          >
            {selected === e ? (<InfoWindow position={{ lat: parseInt(e.latitude), lng: parseInt(e.longitude) }} onCloseClick={() => setSelected(null)}>
              <div className="infoBox">
                <h3>{e.county ? `${e.county} County, ` : null} {e.state}, {e.country}</h3>
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


      {Object.values(worldHashTable).map((e, index) => {
        return (
          <>
          <Marker
            key={index}
            position={{ lat: parseInt(e.latitude), lng: parseInt(e.longitude) }}
            icon={{
              url: icon,
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {setSelected(e)}}
          >
            {selected === e && e.country !== "US" ? (<InfoWindow position={{ lat: parseInt(e.latitude), lng: parseInt(e.longitude) }} onCloseClick={() => setSelected(null)}>
              <div className="infoBox">
                <h3>{e.county ? `${e.county} County, ` : null} {e.province ? `${e.province}, ` : null} {e.country}</h3>
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
