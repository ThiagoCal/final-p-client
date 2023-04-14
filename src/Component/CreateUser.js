import React from "react";
import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import axios from "axios";

export const CreateUser = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [userId, setUserId] = useState(null);

  const params = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId) {
      console.log(firstName, lastName, email, username);
      const sendData = async () => {
        let post = await axios.post("/create_user", {
          firstName,
          lastName,
          email,
          username,
          password,
        });
        console.log("post", post.data);
        console.log(post.data.party.id);
        setUserId(post.data.user.id);
        setFirstName(post.data.user.firstName);
        setLastName(post.data.usere.lastName);
        setUsername(post.data.user.username);
        setEmail(post.data.user.email);
        setPassword(post.data.user.password);
        setIsAdmin(post.data.user.isAdmin);
      };
      sendData();
    } else {
      const updateData = async () => {
        console.log("hello updating");
        let post = await axios.put(`/users/${userId}`, {
          firstName,
          lastName,
          email,
          username,
          password,
        });
        console.log("post", post.data);
      };
      updateData();
    }
  };

  // useEffect(() => {
  //   const getCategories = async () => {
  //     let response = await axios.get("/party_categories_list");
  //     console.log(response.data);
  //     setCategoryArray(response.data);
  //   };
  // }, []);

  useEffect(() => {
    console.log(params);
    if (params.id) {
      const getUser = async () => {
        try {
          let post = await axios.get(`/users/${params.id}`);
          console.log("post", post);
          setUserId(post.data.user.id);
          setFirstName(post.data.user.firstName);
          setLastName(post.data.usere.lastName);
          setUsername(post.data.user.username);
          setEmail(post.data.user.email);
          setPassword(post.data.user.password);
          setIsAdmin(post.data.user.isAdmin);
        } catch (e) {
          console.log(e);
        }
      };
      getUser();
    }
  }, [props.user_id]);

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
              htmlFor="grid-first-name"
            >
              First Name
            </label>
            <input
              className={
                "appearance-none block w-full bg-white border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-indigo-500 focus:shadow-outline-indigo" +
                (!firstName ? " border-red-500" : "")
              }
              id="grid-first-name"
              type="text"
              value={firstName}
              placeholder="Isac"
              onChange={(e) => setFirstName(e.target.value)}
            />
            {/* {
            !partyName && <p className="text-red-500 text-xs italic">Please fill out this field.</p>
          } */}
          </div>
          <div className="w-full px-3 mb-4">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold p-1 mb-2"
              htmlFor="grid-last-name"
            >
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-white border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:border-indigo-500 focus:shadow-outline-indigo"
              id="grid-last-name"
              type="text"
              value={lastName}
              placeholder="Cohen"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="w-full px-3 mb-4">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold p-1 mb-2"
              htmlFor="grid-username"
            >
              Username
            </label>
            <input
              className="appearance-none block w-full bg-white border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:border-indigo-500 focus:shadow-outline-indigo"
              id="grid-username"
              type="text"
              value={username}
              placeholder="IsacCohen"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="w-full px-3 mb-4">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold p-1 mb-2"
              htmlFor="grid-email"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-white border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:border-indigo-500 focus:shadow-outline-indigo"
              id="grid-email"
              type="email"
              value={lastName}
              placeholder="cohen@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full px-3 mb-4">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold p-1 mb-2"
              htmlFor="grid-password"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-white border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:border-indigo-500 focus:shadow-outline-indigo"
              id="grid-password"
              type="password"
              value={lastName}
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center mb-5">
          <button
            type="submit"
            className="bg-blue-600 rounded-lg text-white p-2"
          >
            {userId ? "Update User" : "Create User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
