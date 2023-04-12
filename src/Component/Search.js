import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import MapView from './MapView';

function Search() {
    const [name, setName] = useState('');
//   const [partyDate, setPartyDate] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [parties, setParties] = useState([]);
    let date = new Date();
    let todayDate = moment(date).format('DD-MM-YYYY');

  const handleSearch = async () => {
    console.log(selectedDate)
    
    try {
      const response = await axios.get(`http://localhost:3800/parties_search`, {
        params: { name, party_date: selectedDate, city, address }
      });
      setParties(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectDate = (date1) =>{
    const date = new Date(date1);
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    if(utcDate){
        setSelectedDate(utcDate)
    }
  }

  let a =""

  console.log(todayDate)
  return (
    <div className='container mx-auto px-4'>
      <div className="flex flex-wrap justify-center">
        <div className="w-full md:w-1/5 px-2 mb-4 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="party-name">
            Party Name
          </label>
          <input type="text" id="party-name" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Enter party name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="w-full md:w-1/5 px-2 mb-4 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="city">
            City
          </label>
          <input type="text" id="city" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="w-full md:w-1/5 px-2 mb-4 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address">
            Address
          </label>
          <input type="text" id="address" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="w-full md:w-1/5 px-2 mb-4 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="date">
            Date
          </label>
          <DatePicker
            selected={selectedDate}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            defaultDate={new Date()}
            placeholderText={todayDate}
            onChange={date => handleSelectDate(date)}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            timeZone="Israel"
          />
        </div>

      </div>
      <div className='flex justify-center mt-2'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='button' onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className='w-full mt-5'>
        {
        parties.length > 0 ? 
          (
            <div className='flex'>
              <div className='flex flex-col'>
          {
            parties.map((party) => {
              console.log(party);
              return (
                  <div class="flex flex-col justify-center w-11/12 mr-1 mb-2">
                    <div
                      class="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
                      <div class="w-full md:w-1/3 bg-white grid place-items-center">
                        <img src="https://images.pexels.com/photos/4381392/pexels-photo-4381392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="tailwind logo" class="rounded-xl" />
                      </div>
                      <div class="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                        <div class="flex justify-between item-center">
                          
                          <div class="flex items-center">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500" viewBox="0 0 20 20"
                              fill="currentColor">
                              <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg> */}
                            <p class="text-gray-600 font-bold text-xs ml-1">
                              {moment(party.party_date).format('MMMM Do YYYY, h:mm:ss a')}
                              {/* <span class="text-gray-500 font-normal">(76 reviews)</span> */}
                            </p>
                          </div>
                          <div class="">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-pink-500" viewBox="0 0 20 20"
                              fill="currentColor">
                              <path fill-rule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clip-rule="evenodd" />
                            </svg>
                          </div>
                          <div class="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                            {party.city}
                          </div>
                        </div>
                        <h3 class="font-black text-gray-800 md:text-2xl text-xl">{party.name}</h3>
                        <p class="md:text-m text-gray-500 text-base">{party.description}</p>
                        <p class="text-l font-black text-gray-800">
                          {party.price}
                          <span class="font-normal text-gray-600 text-base">/person</span>
                        </p>
                        <p class="text-gray-500 font-small hidden md:block">Party Category</p>
                      </div>
                    </div>
                  </div>
              )})
            }
            </div>
              <MapView className="w-1/5" state={parties}/>
            </div>
          )
            :
            <></>
          }
          
      </div>
    </div>
  );
  
}

export default Search