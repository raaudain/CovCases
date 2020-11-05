import React, {useState, useEffect} from 'react';
import axios from "axios";

export default function Map() {
    const [location, setLocation] = useState();

    useEffect(() => {

        axios
            .get("https://api.covid19api.com/")
            .then(res => {
                console.log(res)
            })
            .catch(err => console.error(err.response))
    })


    return (
        <>
        </>
    )
}