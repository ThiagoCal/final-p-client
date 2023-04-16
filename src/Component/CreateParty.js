import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import CurrencyInput from "react-currency-input-field";
import DatePicker from "react-datepicker";
import axios from "axios";
import { useAppContext } from "./AppContext";

export const CreateParty = (props) => {
  const { isLogged, user } = useAppContext();
  //show categories in checkboxes
  const [categoryArray, setCategoryArray] = useState([]);
  const [musicTypeArray, setMusicTypeArray] = useState([]);

  //states for creating a party
  const [selectedMusic, setSelectedMusic] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [fullAddress, setFullAddress] = useState("");
  const [address, setAddress] = useState("");
  const [venue, setVenue] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [partyName, setPartyName] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0");
  const [date, setDate] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [partyId, setPartyId] = useState(null);
  const [input, setInput] = useState({});
  const [msg, setMsg] = useState("");
  const [fileName, setFileName] = useState(null);
  const [imgData, setImgData] = useState(null);

  const navigate = useNavigate();

  const params = useParams();

  const handleChangeImage = (e) => {
    console.log("hello", e.target.files[0]);
    setInput(e.target.files[0]);
    console.log(input);
    // const reader = new FileReader();
    // reader.addEventListener("load", () => {
    //   setImgData(reader.result);
    // });
    // reader.readAsDataURL(e.target.files[0]);
  };

  const handleChangePrice = (newValue) => {
    if (newValue === undefined) {
      setPrice("0");
    } else {
      setPrice(newValue);
    }
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const handleCheckboxChangeMusic = (event) => {
    const itemId = parseInt(event.target.value);
    const isChecked = event.target.checked;
    setSelectedMusic((prev) => {
      if (isChecked) {
        return prev.concat(itemId);
      }
      return prev.filter((id) => id !== itemId);
    });
  };

  const handleCheckboxChangeCategory = (event) => {
    const itemId = parseInt(event.target.value);
    const isChecked = event.target.checked;
    setSelectedCategory((prev) => {
      if (isChecked) {
        return prev.concat(itemId);
      }
      return prev.filter((id) => id !== itemId);
    });
    // setSelectedCategory([...selectedCategory]);
    // setSelectedCategory([...selectedCategory], () => { console.log(selectedCategory)})
  };

  const getCoordinates = async (address) => {
    console.log(address);
    try {
      const response = await axios.get(
        "https://api.opencagedata.com/geocode/v1/json? ",
        {
          params: {
            key: process.env.REACT_APP_OPENCAGE_TOKEN,
            q: address,
            language: "en",
          },
        }
      );
      console.log("request url", response);
      return response;
    } catch (e) {
      console.log("getCoordinates===>", e);
    }
  };

  const sendImage = async () => {
    // console.log("input", input);
    const dataForm = new FormData();
    // console.log("input submit", input);
    dataForm.append("image", input);
    // console.log("dataform", dataForm.get("image"));
    try {
      let response = await axios.post("/uploadimg", dataForm);
      console.log("response", response.data);
      console.log("filename", response.data.filename);
      // setFileName(response.data.filename);
      setMsg(response.data.msg);
      return response.data.filename;
    } catch (e) {
      console.log(e);
      setMsg(e.response.data.msg);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!partyId) {
      console.log({
        selectedCategory,
        selectedMusic,
        address,
        addressNumber,
        venue,
        city,
        zipcode,
        partyName,
        description,
        price,
        date,
        user_id: user.id,
      });
      const fAdress = `${address} ${addressNumber}, ${city}, ${zipcode}`;
      setFullAddress(fAdress);
      getCoordinates(fAdress).then((data) => {
        const latitude = data.data.results[0].geometry.lat;
        const longitude = data.data.results[0].geometry.lng;

        const sendData = async () => {
          const file_name = await sendImage();
          let post = await axios.post("/create_party", {
            selectedCategory,
            selectedMusic,
            fullAddress: fAdress,
            fileName: file_name,
            venue,
            address,
            addressNumber,
            city,
            zipcode,
            partyName,
            description,
            price,
            date,
            latitude,
            longitude,
            user_id: user.id,
          });
          setPartyId(post.data.party.id);
          setPartyName(post.data.party.name);
          setVenue(post.data.party.venue);
          setFileName(post.data.party.fileName);
          setAddress(post.data.party.address_name);
          setAddressNumber(post.data.party.address_number);
          setZipcode(post.data.party.zipcode);
          setCity(post.data.party.city);
          setDescription(post.data.party.description);
          setPrice(post.data.party.price);
          setIsActive(post.data.party.is_active);
          setFullAddress(post.data.party.address);
          setSelectedMusic(post.data.party.musicid);
          setSelectedCategory(post.data.party.categoryid);
        };
        sendData();
      });
    } else {
      setFullAddress(`${address} ${addressNumber}, ${city} ${zipcode}`);
      getCoordinates(`${address} ${addressNumber}, ${city} ${zipcode}`).then(
        (data) => {
          const latitude = data.data.results[0].geometry.lat;
          const longitude = data.data.results[0].geometry.lng;
          const updateData = async () => {
            const file_name = await sendImage();
            console.log("update filename", file_name);
            let post = await axios.put(`/parties/${partyId}`, {
              selectedCategory,
              selectedMusic,
              fullAddress,
              fileName: file_name,
              venue,
              address,
              addressNumber,
              city,
              zipcode,
              partyName,
              description,
              price,
              date,
              latitude,
              longitude,
            });
          };
          updateData();
        }
      );
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      let response = await axios.get("/party_categories_list");

      setCategoryArray(response.data);
    };
    getCategories();
    const getMusicTypes = async () => {
      let response = await axios.get("/music_types");

      setMusicTypeArray(response.data);
    };
    getMusicTypes();
  }, []);

  useEffect(() => {
    if (params.id) {
      const getParty = async () => {
        try {
          let get = await axios.get(`/parties/${params.id}`);
          if (get.data.user_id !== user.id) {
            navigate("/");
            return;
          }
          console.log("get", get);
          setPartyId(get.data.id);
          setPartyName(get.data.name);
          setVenue(get.data.venue);
          setFileName(get.data.image_path);
          setAddress(get.data.address_name);
          setAddressNumber(get.data.address_number);
          setZipcode(get.data.zipcode);
          setCity(get.data.city);
          setDescription(get.data.description);
          setDate(new Date(get.data.party_date));
          setPrice(get.data.price);
          setIsActive(get.data.is_active);
          setFullAddress(get.data.address);
          setSelectedMusic(get.data.musicid);
          setSelectedCategory(get.data.categoryid);
        } catch (e) {
          console.log(e);
        }
      };
      getParty();
    }
  }, [props.party_id]);

  return (
    <div className="container mx-auto my-4">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="max-w-lg mx-auto p-5 bg-white shadow-md rounded"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 p-1 text-xs font-bold mb-2"
              htmlFor="grid-party-name"
            >
              Name of the Party
            </label>
            <input
              className={
                "appearance-none block w-full bg-white border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-indigo-500 focus:shadow-outline-indigo" +
                (!partyName ? " border-red-500" : "")
              }
              id="grid-party-name"
              type="text"
              value={partyName}
              placeholder="Electric Nights"
              onChange={(e) => setPartyName(e.target.value)}
              disabled={!isLogged}
            />
            {/* {
            !partyName && <p className="text-red-500 text-xs italic">Please fill out this field.</p>
          } */}
          </div>
          <div className="w-full px-3 mb-4">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold p-1 mb-2"
              htmlFor="grid-venue"
            >
              Venue
            </label>
            <input
              className="appearance-none block w-full bg-white border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:border-indigo-500 focus:shadow-outline-indigo"
              id="grid-venue"
              type="text"
              value={venue}
              placeholder="Name of the venue"
              onChange={(e) => setVenue(e.target.value)}
            />
          </div>
          <div className="w-full px-3 mb-4">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold p-1 mb-2"
              htmlFor="grid-address"
            >
              Address
            </label>
            <input
              className="appearance-none block w-full bg-white border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:border-indigo-500 focus:shadow-outline-indigo"
              id="grid-address"
              type="text"
              value={address}
              placeholder="123 Main St."
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {/* <div className="flex flex-wrap -mx-3 mb-4"> */}
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 p-1 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              City
            </label>
            <input
              className="appearance-none block w-full bg-white border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:shadow-outline-indigo focus:border-indigo-500"
              id="grid-city"
              type="text"
              value={city}
              placeholder="Albuquerque"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 p-1 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              Number
            </label>
            <input
              className="appearance-none block w-full bg-white border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:shadow-outline-indigo focus:border-indigo-500"
              id="grid-city"
              type="text"
              value={addressNumber}
              placeholder="1"
              onChange={(e) => setAddressNumber(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 p-1 text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              Zip
            </label>
            <input
              className="appearance-none block w-full bg-white border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:shadow-outline-indigo focus:border-indigo-500"
              id="grid-zip"
              type="text"
              value={zipcode}
              placeholder="90210"
              onChange={(e) => setZipcode(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          {/* Price input field */}
          <div className=" md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 p-1 text-xs font-bold mb-2"
              htmlFor="input-currency-field"
            >
              Price
            </label>
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
              className="appearance-none block w-full bg-white border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:shadow-outline-indigo focus:border-indigo-500"
            />
          </div>
          {/* Party date picker */}
          <div className="flex flex-col  md:w-1/2 ">
            <label
              className="block uppercase tracking-wide text-gray-700 p-1 text-xs font-bold mb-2 "
              htmlFor="date"
            >
              Party Date
            </label>
            <div className=" w-60 border 1px solid black">
              <DatePicker
                id={"date"}
                selected={date}
                onChange={(date) => setDate(date)}
                showTimeSelect
                filterTime={filterPassedTime}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 p-1 text-xs font-bold mb-2"
              htmlFor="grid-image"
            >
              Attach the party Image
            </label>
            <input
              type="file"
              id="grid-image"
              name="myImage"
              onChange={(e) => handleChangeImage(e)}
              accept="image/*"
            />
            {/* <div className="previewProfilePic">
              <img className="playerProfilePic_home_tile" src={imgData} />
            </div> */}
            {fileName ? (
              <div>
                <img
                  src={`${process.env.REACT_APP_SERVERURL}${fileName}`}
                  maxWidth={"300px"}
                ></img>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          {/* Party description input field */}
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 p-1 text-xs font-bold mb-2"
              htmlFor="grid-description"
            >
              Party Description
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-description"
              type="text"
              value={description}
              placeholder="Here is my party and I cry if I want to"
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>

        <div className="w-full  flex-wrap -mx-3 ml-2 mb-6">
          {/* Party category checkboxes */}
          <div className="flex-col w-full mt-2">
            <span className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Choose your party category:
            </span>
            {categoryArray.map((elem) => {
              return (
                <div className="flex-col" key={elem.category_id}>
                  <label>
                    <input
                      type="checkbox"
                      value={elem.category_id}
                      checked={selectedCategory.includes(elem.category_id)}
                      onChange={handleCheckboxChangeCategory}
                    />
                    {elem.category_name}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="flex-col w-full mt-2">
            <span className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Choose the music category from your party:
            </span>
            {musicTypeArray.map((elem) => {
              return (
                <div className="flex-col">
                  <label key={elem.music_id}>
                    <input
                      type="checkbox"
                      value={elem.music_id}
                      checked={selectedMusic.includes(elem.music_id)}
                      onChange={handleCheckboxChangeMusic}
                    />
                    {elem.category_name}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center mb-5">
          <button
            type="submit"
            className="bg-blue-600 rounded-lg text-white p-2"
          >
            {partyId ? "Update Party" : "Create Party"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateParty;
