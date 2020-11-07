import React from "react";

export default function LocateMe({ panTo }) {
  return <button className="locate" onClick={() => {
    navigator.geolocation.getCurrentPosition((position) => {
      panTo({ lat: position.coords.latitude, lng: position.coords.longitude })
    }, () => null);
        
  }}>
  <img src="" alt="compass"></img>
  </button>
}