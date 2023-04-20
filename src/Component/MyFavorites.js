import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useAppContext } from "./AppContext";

export default function MyFavorites() {
  const { user } = useAppContext();
  const [parties, setParty] = useState(null);
  const [bookmarks, setBookmarks] = useState(null);

  useEffect(() => {
    const getBookmarks = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASEURL}/bookmarks/${user.id}`
      );
      console.log(res.data.bookmarks);
      setBookmarks(res.data.bookmarks);
      const fav = res.data.bookmarks.map((favorites) => favorites.party_id);
      setParty(fav);
    };
    getBookmarks();
  }, [user]);

  const deleteBookmark = async (id) => {
    const res = await axios.delete(
      `${process.env.REACT_APP_BASEURL}/bookmark/${id}`
    );
    const response = await axios.get(`/bookmarks/${user.id}`);
    console.log(response.data);
    if (res.data.bookmarks === []) {
      const fav = res.data.bookmarks.map((favorites) => favorites.party_id);
      setParty(fav);
      setBookmarks(res.data.bookmarks);
    } else {
      setBookmarks("");
      setParty("");
    }
  };
  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <h2 className="my-4 text-2xl font-bold">My Favorites</h2>
      </div>

      {parties ? (
        <div className="flex flex justify-center gap-4">
          {parties.map((party) => {
            return (
              <div
                className="bg-white flex flex-col  my-3 md:w-1/2 lg:w-1/2 shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700"
                key={party.id}
              >
                <a href="#">
                  <img
                    className={"rounded-t-lg object-cover"}
                    src={`${process.env.REACT_APP_BASEURL}${
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
                {bookmarks.map((bookmark) => (
                  <div className="flex justify-center mb-2">
                    <button
                      type="button"
                      onClick={() => deleteBookmark(bookmark.id)}
                      className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                      Unfavorite
                    </button>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
