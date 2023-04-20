import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useAppContext } from "./AppContext";

export default function Party(props) {
  const { user } = useAppContext();
  const [party, setParty] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    console.log("user", user);
    if (params.id) {
      const getParty = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_BASEURL}/parties/${params.id}`
        );
        setParty(res.data);
      };
      getParty();
    }
  }, [params.id, user]);

  const addBookmark = async () => {
    const res = await axios.post(`${process.env.REACT_APP_BASEURL}/bookmarks`, {
      partyId: party.id,
      userId: user.id,
    });
    console.log(res.data);
    navigate("/user-favorites");
  };
  return (
    <div className="container mx-auto">
      {/* <div className="font-bold flex  text-gray-700 mb-5 text-4xl dark:text-gray-400">
        Your Parties
      </div> */}
      <div className="flex">
        <div className="flex w-full justify-center">
          {/* {loading ? (
            <div>Loading</div>
          ) : ( */}
          {party ? (
            <>
              <div
                className="bg-white flex flex-col my-3 shadow-md border border-gray-200 rounded-lg md:w-l dark:bg-gray-800 dark:border-gray-700"
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
                      {moment(party.party_date).format("MMMM Do YYYY, h:mm a")}
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
                </div>
                <button
                  type="button"
                  className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-3"
                  onClick={addBookmark}
                >
                  Add Bookmark
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
