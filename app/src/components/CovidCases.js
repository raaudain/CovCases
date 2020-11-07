import React, {useState, useEffect} from 'react';
import {Marker, InfoWindow} from "@react-google-maps/api";
import axios from "axios";

export default function CovidCases({data}) {

    useEffect(async () => {
        await axios
            .get("https://disease.sh/v3/covid-19/jhucsse/counties")
            .then(res => {
                    setData(res.data)
            })
            .catch(err => console.error(err));
    }, []);

    return (
 
        <>
        
        {data.map((e, index) => {
            // {const {province, county, stats, coordinates} = e;}
            // {const {latitude, longitude} = coordinates;}
            // const {confirmed, deaths, recovered} = stats;
            {console.log(index)};

            <>
                <Marker 
                key={index} 
                position={{lat: 45.421532, lng: -75.697189}} 
                icon={{
                    scaledSize: new window.google.maps.Size(30,30),
                    origin: new window.google.maps.Point(0,0),
                    anchor: new window.google.maps.Point(0,0),
                }}
                ></Marker>
                <InfoWindow></InfoWindow>
            </>
            
                
            })}

        </>
    )

}