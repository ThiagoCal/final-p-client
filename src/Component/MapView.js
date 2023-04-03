import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


export const MapView = (props) => {

  const [parties, setParties] = useState('')
  useEffect(()=>{
    setParties(props.state)
  })

  return (
    parties ?
    parties.map(party => {
      console.log('party',party.longitude)
      return(
        <Map
        id="mymap"
        initialViewState={{
          longitude: party.longitude,
          latitude: party.latitude,
          zoom: 14
        }}
        style={{width: 800, height: 600}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      />
      )
    })
  
    :
    <></>
  )
}



export default MapView