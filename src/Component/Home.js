import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Search from './Search';
import MapView from './MapView';
import { Link } from 'react-router-dom';
import { MapProvider } from 'react-map-gl';


export const Home = (props) => {
  // const [parties, setParties] = useState('')


  // useEffect(()=>{
  //   const getParties = async() =>{
  //     let response = await axios.get('/parties')
  //     console.log(response.data)
  //     setParties(response.data)
  //   }
  //   getParties()
  //   console.log('parties', parties)
  // },[])

  return (
    <>
      {/* <div>Home</div> */}
      <MapProvider>
        <Search/>
      </MapProvider>
      {/* <MapView state={parties}/> */}
      {/* {
        parties?

        parties.map(party =>{
          return(
            <div className='flex flex-col '>
             <span>{party.name} <Link to={`/parties/${party.id}`}>Update</Link></span>
            </div>
          )
        })
        :
        <></>
      } */}
    </>
  )
}


export default Home