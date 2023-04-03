import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function Search() {
    const [name, setName] = useState('');
//   const [partyDate, setPartyDate] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [parties, setParties] = useState([]);

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


  return (
    <div>
      <input type="text"  className='border 1px solid black' value={name} onChange={(e) => setName(e.target.value)} />
      <DatePicker
        selected={selectedDate}
        onChange={date => handleSelectDate(date)}
        dateFormat="yyyy-MM-dd"
        minDate={new Date()}
        timeZone="Israel"
        />
      <input type="text" className='border 1px solid black' value={city} onChange={(e) => setCity(e.target.value)} />
      <input type="text" className='border 1px solid black' value={address} onChange={(e) => setAddress(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      {parties.map((party) => {
        console.log(party);
        return (
            <div key={party.id}>{party.name}</div>
        )
        })}
    </div>
  );
}

export default Search