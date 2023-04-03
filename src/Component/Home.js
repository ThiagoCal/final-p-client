import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Search from './Search';
import MapView from './MapView';


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
      <MapView state={parties}/>
    </>
  )
}


export default Home