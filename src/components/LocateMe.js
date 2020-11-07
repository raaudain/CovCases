import React from "react";

export default function LocateMe({ panTo }) {
  // Pans user to location when button is clicked
  const locate = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
      panTo({ lat: position.coords.latitude, lng: position.coords.longitude })
    }, () => null);
  }

  return (
    <button className="locateBtn" onClick={locate}>
      Locate Me
    </button>
  );
}