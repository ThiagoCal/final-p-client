import React from 'react'
import {Link, useParams} from 'react-router-dom'
import { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import CurrencyInput from 'react-currency-input-field';
import DatePicker from "react-datepicker";
import axios from 'axios';


export const CreateParty = (props) => {

  //show categories in checkboxes
  const [categoryArray, setCategoryArray] = useState([])
  const [musicTypeArray, setMusicTypeArray] = useState([])

  //states for creating a party
  const [selectedMusic, setSelectedMusic] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [fullAddress, setFullAddress] = useState('')
  const [address, setAddress] = useState('')
  const [addressNumber, setAddressNumber] = useState('')
  const [partyName, setPartyName]  = useState('')
  const [city, setCity] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('0')
  const [date, setDate] = useState('')
  const [isActive, setIsActive] = useState(true)
  
  const [partyId, setPartyId] = useState(null)
  //states for updating a party
  const params = useParams()
  // const [latitude, setLatitude] = useState('')
  // const [longitude, setLongitude] = useState('')

  const handleChangePrice = (newValue) => {
    console.log("onValueChange fired");
    if (newValue === undefined) {
      setPrice("0");
    } else {
      setPrice(newValue);
      console.log('price', price)
    }
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const handleCheckboxChange = (event) => {
    const itemId = event.target.value;
    console.log(itemId)
    const isChecked = event.target.checked;
    console.log(isChecked)
    if(isChecked){
      selectedMusic.push(itemId)
    }else{
      const index = selectedMusic.indexOf(itemId);
      if (index !== -1) selectedMusic.splice(index, 1)
    }
    setSelectedMusic([...selectedMusic])
    // setSelectedMusic([...selectedMusic], () => { console.log(selectedMusic)})
  };

  const handleCheckboxChangeCategory = (event) => {
    const itemId = event.target.value;
    console.log(itemId)
    const isChecked = event.target.checked;
    console.log(isChecked)
    if(isChecked){
      selectedCategory.push(itemId)
    }else{
      const index = selectedCategory.indexOf(itemId);
      if (index !== -1) selectedCategory.splice(index, 1)
    }
    setSelectedCategory([...selectedCategory])
    // setSelectedCategory([...selectedCategory], () => { console.log(selectedCategory)})
  };

  const getCoordinates = async(address) =>{
    console.log(process.env.REACT_APP_OPENCAGE_URL);
    console.log(process.env.REACT_APP_OPENCAGE_TOKEN);
    console.log(encodeURIComponent(address))
    try{
      let request_url = `${process.env.REACT_APP_OPENCAGE_URL}`
      + '?'
      + 'key=' + process.env.REACT_APP_OPENCAGE_TOKEN
      + '&q=' + encodeURIComponent(address)
      + '&pretty=1'
      + '&no_annotations=1';
      try{
        let coordinates = await axios.get(request_url)
        console.log('coordinates-->',coordinates)
        console.log('long', coordinates.data.results[0].geometry.lng)
        return coordinates
      }catch(e){
        console.log('axios request', e);
      }
    }
    catch(e){
      console.log('getCoordinates===>',e);
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!partyId){
      console.log(selectedCategory, selectedMusic, address, addressNumber, city, zipcode, partyName, description, price, date)
      const fAdress = `${address}, ${addressNumber}, ${zipcode}, ${city}` 
      setFullAddress(fAdress)
      getCoordinates(fAdress)
      .then(data=>{
        const latitude = data.data.results[0].geometry.lat;
        const longitude = data.data.results[0].geometry.lng;
        const sendData = async() =>{
          let post = await axios.post('/create_party', {selectedCategory, selectedMusic, fullAddress: fAdress , address, addressNumber, city, zipcode, partyName, description, price, date, latitude, longitude})
          console.log('post', post.data)
          console.log(post.data.party.id);
          setPartyId(post.data.party.id)
          setPartyName(post.data.party.name)
          setAddress(post.data.party.address_name)
          setAddressNumber(post.data.party.address_number)
          setZipcode(post.data.party.zipcode)
          setCity(post.data.party.city)
          setDescription(post.data.party.description)
          // setDate(post.data.party.party_date)
          setPrice(post.data.party.price)
          setIsActive(post.data.party.is_active)
          setFullAddress(post.data.party.address)
          setSelectedMusic(post.data.party.musicid)
          setSelectedCategory(post.data.party.categoryid)
        }
        sendData()
      })
    }else{
      setFullAddress(`${address}, ${addressNumber}, ${zipcode}, ${city}`)
      getCoordinates(`${address}, ${addressNumber}, ${zipcode}, ${city}`)
      .then(data=>{
        const latitude = data.data.results[0].geometry.lat;
        const longitude = data.data.results[0].geometry.lng;
        const updateData = async() =>{
          console.log('hello updating')
          let post = await axios.put(`/parties/${partyId}`, {selectedCategory, selectedMusic, fullAddress, address, addressNumber, city, zipcode, partyName, description, price, date, latitude, longitude})
          console.log('post', post.data)
        }
        updateData()
      })
    }
  }

  useEffect(() => {
    const getCategories = async() =>{
      let response = await axios.get('/party_categories_list')
      console.log(response.data)
      setCategoryArray(response.data)
    }
    getCategories()
    const getMusicTypes = async() =>{
      let response = await axios.get('/music_types')
      console.log(response.data)
      setMusicTypeArray(response.data)
    }
    getMusicTypes()
    
  }, [])

  // const handleUpdateCheckbox = async() =>{
  //   let musicSelected = selectedCategory.map(music =>{

  //   })
  // }

  useEffect(()=>{
    console.log(params)
    if(params.id){
      const getParty = async ()=>{
        try{
          let post = await axios.get(`/parties/${params.id}`)
          console.log('post', post)
          setPartyId(post.data.id)
          setPartyName(post.data.name)
          setAddress(post.data.address_name)
          setAddressNumber(post.data.address_number)
          setZipcode(post.data.zipcode)
          setCity(post.data.city)
          setDescription(post.data.description)
          setDate(new Date(post.data.party_date))
          setPrice(post.data.price)
          setIsActive(post.data.is_active)
          setFullAddress(post.data.address)
          setSelectedMusic(post.data.musicid)
          setSelectedCategory(post.data.categoryid)
        }catch(e){
          console.log(e);
        }
      }
      getParty()
    }
  }, [props.party_id])
  
  return (
    <div className='container ml-4'>
      <form onSubmit={(e)=>handleSubmit(e)} class="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-party-name">
             Name of the Party
            </label>
            <input className={"appearance-none block w-full required" + (!partyName ? "border-red-500" : "") + "bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"} 
            id="grid-party-name" type="text" value={partyName} placeholder="Electric Nights"  onChange={(e)=>setPartyName(e.target.value)}/>
            {/* {
              !partyName && <p class="text-red-500 text-xs italic">Please fill out this field.</p>
            } */}
          </div>
          <div className="w-full  px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-address">
              Address
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
             id="grid-address" type="text" value={address} placeholder="123 Main St." onChange={(e)=>setAddress(e.target.value)}/>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                City
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
               id="grid-city" type="text" value={city} placeholder="Albuquerque" onChange={(e)=>setCity(e.target.value)}/>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                Number
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
               id="grid-city" type="text" value={addressNumber} placeholder="1" onChange={(e)=>setAddressNumber(e.target.value)}/>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                Zip
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
               id="grid-zip" type="text" value={zipcode} placeholder="90210" onChange={(e)=>setZipcode(e.target.value)}/>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <CurrencyInput
              allowDecimals
              decimalSeparator="."
              id="input-currency-field"
              name="input-currency-field-name"
              decimalsLimit={2}
              maxLength={8}
              prefix="$"
              value={price}
              onValueChange={handleChangePrice}
              step={1}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
             Party Description
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
             id="grid-password" type="text" value={description} placeholder="Here is my party and I cry if I want to" onChange={(e)=>setDescription(e.target.value)} />
            <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex-wrap -mx-3 mb-6">
          <div className="flex-col w-full ">
            <span>Choose you party category:</span>
            {
              categoryArray.map(elem =>{
                return(
                  <div className='flex-col'>
                    <label key={elem.category_id}>
                    <input
                      type="checkbox"
                      value={elem.category_id}
                      // defaultChecked={a}
                      onChange={(e)=>handleCheckboxChangeCategory(e)}
                    />
                    {elem.category_name}
                    </label>
                  </div>
                )
              })
            }
          </div>
          <div className="flex-col w-full ">
            <span>Choose the music category from your party:</span>
            {
              musicTypeArray.map(elem =>{
                return(
                  <div className='flex-col'>
                    <label key={elem.music_id}>
                    <input
                      type="checkbox"
                      value={elem.music_id}
                      onChange={(e)=>handleCheckboxChange(e)}
                    />
                    {elem.category_name}
                    </label>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="mx-auto w-64 border 1px solid black">
          <DatePicker
            selected={date}
            onChange={date => setDate(date)}
            showTimeSelect
            filterTime={filterPassedTime}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button type="submit">{partyId ? 'Update Party' : 'Create Party'}</button>
      </form>
    </div>
  )
}



  {/* 
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              State
            </label>
            <div class="relative">
              <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option>New Mexico</option>
                <option>Missouri</option>
                <option>Texas</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div> */}


export default CreateParty