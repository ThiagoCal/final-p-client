import React, { useEffect } from "react";
import { useAppContext } from "./AppContext";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const { user, setUser } = useAppContext();
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [username, setUsername] = useState(user.username);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateUser = async () => {
      try {
        let res = await axios.put(`/users/${user.id}`, {
          first_name: firstName,
          last_name: lastName,
          username,
          email,
        });
        console.log(res.data);
        setUser(res.data);
        navigate("/login");
      } catch (err) {
        console.log(err.response.data);
        setMsg(err.response.data.msg);
      }
    };
    updateUser();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="w-full max-w-lg m-auto">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            First Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Last Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-username"
          >
            Username
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-username"
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-email"
          >
            Email
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-email"
            type="text"
            value={email}
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-center mb-5">
        <button type="submit" className="bg-blue-600 rounded-lg text-white p-2">
          "Update User"
        </button>
      </div>
    </form>
  );
}
