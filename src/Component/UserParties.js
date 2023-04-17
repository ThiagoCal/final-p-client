import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "./AppContext";
import moment from "moment";
import axios from "axios";

export default function UserParties() {
  const { isLogged, user } = useAppContext();
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getParties = async () => {
      const response = await axios.get(`/${user.id}/parties`);
      console.log(response.data);
      setParties(response.data);
      setLoading(false);
    };
    getParties();
  }, []);

  const deleteParty = async (id) => {
    // let text = "You are deleting the party!\nConfirm or Cancel.";
    if (window.confirm("Are you sure you want to delete the party?")) {
      try {
        console.log("hi from delete");
        const del = await axios.delete(`/parties/${id}`);

        const response = await axios.get(`/${user.id}/parties`);
        console.log(response.data);
        setParties(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  };

  return (
    <div className="container mx-auto justify-center">
      <div className="font-bold flex  text-gray-700 mb-5 text-4xl dark:text-gray-400">
        Your Parties
      </div>
      <div className="flex ">
        <div className="flex w-full justify-around  flex-wrap">
          {loading ? (
            <div>Loading</div>
          ) : (
            <>
              {parties.map((party) => {
                return (
                  <div
                    className="bg-white flex flex-col  my-3 md:w-1/2 lg:w-1/2 shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700"
                    key={party.id}
                  >
                    <a href="#">
                      <img
                        className={"rounded-t-lg object-cover"}
                        src={`${process.env.REACT_APP_SERVERURL}${
                          party.image_path ?? "default.jpeg"
                        }`}
                        style={{ height: "350px", minWidth: "100%" }}
                        alt={""}
                      />
                    </a>
                    <div className="flex flex-col grow justify-between p-5">
                      <div className="flex flex-col justify-between item-center">
                        <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
                          {party.name}
                        </h5>
                        <p className="font-bold text-gray-700 mb-1 dark:text-gray-400">
                          Party Date:
                        </p>
                        <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                          {moment(party.party_date).format(
                            "MMMM Do YYYY, h:mm a"
                          )}
                        </p>
                        <p className="font-bold text-gray-700 mb-1 dark:text-gray-400">
                          Party Description:
                        </p>
                        <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                          {party.description}
                        </p>
                        <p className="font-bold text-gray-700 mb-1 dark:text-gray-400">
                          Venue:
                        </p>
                        <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                          {party.venue}
                        </p>
                        <p className="font-bold text-gray-700 mb-1 dark:text-gray-400">
                          Address:
                        </p>
                        <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                          {party.address}
                        </p>
                        <p className="font-bold text-gray-700 mb-1 dark:text-gray-400">
                          Price:
                        </p>
                        <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                          {party.price}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={() => deleteParty(party.id)}
                          className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          Delete Party
                        </button>
                        <Link
                          to={`/update-party/${party.id}`}
                          className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Update Party
                          <svg
                            className="-mr-1 ml-2 h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule={"evenodd"}
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule={"evenodd"}
                            ></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
