import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import MapView from "./MapView";
import { useMap } from "react-map-gl";

function Search() {
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [city, setCity] = useState("");
  const [venue, setVenue] = useState("");
  const [partyCategory, setCategoryArray] = useState([]);
  const [musicCategory, setMusicTypeArray] = useState([]);
  const [parties, setParties] = useState(null);
  const [loading, setLoading] = useState(false);
  const [musicId, setMusicId] = useState([]);
  const [music, setMusic] = useState("");
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState([]);
  let date = new Date();
  let todayDate = moment(date).format("DD-MM-YYYY");

  useEffect(() => {
    const getCategories = async () => {
      let response = await axios.get("/party_categories_list");
      console.log("party categories", response.data);
      setCategoryArray(response.data);
    };
    getCategories();
    const getMusicTypes = async () => {
      let response = await axios.get("/music_types");

      setMusicTypeArray(response.data);
    };
    getMusicTypes();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      console.log("categoryID", categoryId);
      console.log("MUSIC", musicId);
      const response = await axios.get(`http://localhost:3800/parties_search`, {
        params: {
          name,
          party_date: selectedDate,
          city,
          venue,
          musicId,
          categoryId,
        },
      });
      setParties(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // function handleDateChange(e) {
  //   const date = new Date(e);
  //   const utcDate = new Date(
  //     Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  //   );
  //   setSelectedDate(utcDate);
  // }
  // function handleInputChange(e) {
  //   const date = new Date(e);
  //   const utcDate = new Date(
  //     Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  //   );
  //   setSelectedDate(utcDate ? utcDate : null);
  // }

  const handleSelectDate = (date1) => {
    const date = new Date(date1);
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    if (utcDate) {
      setSelectedDate(utcDate);
    }
  };

  const handlePartyCategoryChange = (e) => {
    console.log(e.target.value);
    if (e.target.options.selectedIndex - 1 === -1) {
      setCategoryId(null);
      // setCategory(null);
      return;
    } else {
      let selectedCategory = e.target.options.selectedIndex - 1;
      selectedCategory = selectedCategory.toString();
      console.log(selectedCategory);
      setCategoryId(selectedCategory);
      // setCategory(e.target.value);
    }
  };

  const handleMusicCategoryChange = (e) => {
    console.log(e.target.options.selectedIndex - 1);
    if (e.target.options.selectedIndex - 1 === -1) {
      // console.log("hi");
      setMusicId(null);
      // setMusic(null);
      return;
    } else {
      let selectedCategory = e.target.options.selectedIndex - 1;
      selectedCategory = selectedCategory.toString();
      setMusicId(selectedCategory);
      // setMusic(e.target.value);
    }
  };

  const { mymap } = useMap();

  const handlePartyCardClick = (party) => {
    mymap.flyTo({
      center: [party.longitude, party.latitude],
      zoom: 15,
    });
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-center">
        <div className="w-full md:w-1/5 px-2 mb-4 md:mb-0" id="search-section">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="party-name"
          >
            Party Name
          </label>
          <input
            type="text"
            id="party-name"
            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Enter party name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/5 px-2 mb-4 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="city"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/5 px-2 mb-4 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="venue"
          >
            Venue
          </label>
          <input
            type="text"
            id="venue"
            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Enter venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        <div class="w-full md:w-1/5 px-2 mb-4 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-music"
          >
            Party Category
          </label>
          <div class="relative">
            <select
              class="block appearance-none  border border-gray-200 text-gray-700 py-3 px-4 8pr- rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-music"
              onChange={handlePartyCategoryChange}
            >
              <option value="">All Categories</option>
              {partyCategory.map((category) => {
                return (
                  <option key={category.category_id}>
                    {category.category_name}
                  </option>
                );
              })}
            </select>
            <div class="pointer-events-none absolute inset-y-0 left-28 flex items-center px-2 text-gray-700">
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="w-full md:w-1/5 px-2 mb-4 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-music"
          >
            Music Category
          </label>
          <div class="relative md:w-1/3">
            <select
              class="block appearance-none  border border-gray-200 text-gray-700 py-3 px-4 8pr- rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-music"
              onChange={handleMusicCategoryChange}
            >
              <option value="">All Categories</option>
              {partyCategory.map((category) => {
                return (
                  <option key={category.category_id}>
                    {category.category_name}
                  </option>
                );
              })}
            </select>
            <div class="pointer-events-none absolute inset-y-0 left-28 flex items-center px-2 text-gray-700">
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/5 px-2 mb-4 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="date"
          >
            Date
          </label>
          <DatePicker
            selected={selectedDate}
            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            defaultDate={new Date()}
            placeholderText={todayDate}
            onChange={handleSelectDate}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            timeZone="Israel"
            isClearable={true}
          />
        </div>
      </div>

      <div className="flex justify-center mx-auto mt-6">
        <button
          className="bg-primary w-2/5  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {loading ? (
        <div key={"loading"}> Loading ...</div>
      ) : (
        <div className="w-full mt-5" key={"container"}>
          {parties?.length > 0 ? (
            <div className="flex justify-center">
              <div className="flex flex-col w-3/5">
                {parties.map((party) => {
                  return (
                    <>
                      <div
                        className="flex flex-col justify-center w-full mr-1 mb-2"
                        key={party.id}
                      >
                        <div
                          className="relative flex flex-row w-4/5 rounded-xl shadow-lg p-2  mx-auto border border-white bg-white"
                          onClick={() => handlePartyCardClick(party)}
                          key={party.id}
                        >
                          <div className="w-3/4 bg-white grid place-items-center">
                            <img
                              src={`${process.env.REACT_APP_SERVERURL}${
                                party.image_path ?? "default.jpeg"
                              }`}
                              style={{
                                maxHeight: "250px",
                                minHeight: "250px",
                                minWidth: "100%",
                              }}
                              alt={"tailwind logo"}
                              className={"rounded-xl"}
                            />
                          </div>
                          <div className="w-full md:w-2/3 bg-white flex flex-col justify-between space-y-2 p-3">
                            <div className="flex flex-col justify-between item-center">
                              <p className="text-gray-600 font-bold text-xs ml-1">
                                {moment(party.party_date).format(
                                  "MMMM Do YYYY, h:mm a"
                                )}
                              </p>
                              <h3 className="font-black text-gray-800 md:text-xl text-xl truncate ">
                                {party.name}
                              </h3>
                              <p className="md:text-m text-gray-500 text-base  ">
                                {party.description.length > 350
                                  ? `${party.description.slice(0, 350)}...`
                                  : party.description}
                              </p>
                            </div>
                            <div className="">
                              <p className="md:text-m text-gray-500 text-base">
                                {party.address}
                              </p>
                              <p className="text-l font-black text-gray-800">
                                <span className="font-normal text-gray-600 text-base">
                                  {`Price: `}
                                </span>
                                ${party.price}
                                <span className="font-normal text-gray-600 text-base">
                                  /person
                                </span>
                              </p>
                              {/* <p className="text-gray-500 font-small hidden md:block">
                            {category}
                          </p>
                          <p className="text-gray-500 font-small hidden md:block">
                            {music}
                          </p> */}
                              <div className="px-3 text-center py-1 bg-gray-200 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                                {party.city}
                              </div>
                              <Link to={`/party/${party.id}`}>
                                <div
                                  className=" px-3
                                text-center
                                py-1
                                bg-primary
                                rounded-full
                                text-xs
                                font-medium
                                text-gray-800
                                hidden
                                md:block
                                mt-2
                              "
                                >
                                  Link to the party
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
              <MapView className="w-1/5" parties={parties} />
            </div>
          ) : (
            parties !== null && <div>Couldn't find any party</div>
          )}
        </div>
      )}
    </div>
  );
  {
    /* <div className="">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-pink-500"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule={"evenodd"}
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule={"evenodd"}
    />
  </svg>
</div> */
  }
}

export default Search;
