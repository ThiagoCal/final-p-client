import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  return (
    <div className="container mx-auto">
      <div className="font-bold text-gray-700 mb-5 text-4xl dark:text-gray-400">
        Your Parties
      </div>
      <div className="flex">
        <div className="flex">
          {loading ? (
            <div>Loading</div>
          ) : (
            <>
              {parties.map((party) => {
                return (
                  <div
                    className="bg-white mx-3 my-3 shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700"
                    key={party.id}
                  >
                    <a href="#">
                      <img
                        className={"rounded-t-lg"}
                        src={`${process.env.REACT_APP_SERVERURL}${party.image_path}`}
                        alt={""}
                      />
                    </a>
                    <div className="p-5">
                      <a href="#">
                        <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
                          {party.name}
                        </h5>
                      </a>
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
                      <Link
                        to={`/update-party/${party.id}`}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
