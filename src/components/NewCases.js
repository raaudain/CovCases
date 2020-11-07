import React, {useState} from "react";

export default function NewCases() {
  const [marker, setMarker] = useState([]);

  return(
        <>
        {/* Loops through each click and displays marker */}
        {marker.map((click) => (
            <Marker
              key={click.time.toISOString()}
              position={{ lat: click.lat, lng: click.lng }}
              icon={{
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(0, 0),
              }}
              onClick={() => setSelected(marker)}
            />
          ))}

          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <p>Virus</p>
              </div>
            </InfoWindow>
          ) : null}
        </>
    )
}