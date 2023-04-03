import React, { useEffect, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
// import mapboxgl from '!mapbox-gl';
import axios from 'axios';
import Search from './Search';

export const Home = (props) => {
  const [parties, setParties] = useState('')


  useEffect(()=>{
    const getParties = async() =>{
      let response = await axios.get('/parties')
      console.log(response.data)
      setParties(response.data)
    }
    getParties()
    console.log('parties', parties)
  },[])

  return (
    <>
      <div>Home</div>
      <Search/>
    </>
  )
}


export default Home