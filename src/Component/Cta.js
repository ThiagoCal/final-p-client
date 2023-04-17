import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "./AppContext";

export default function Cta() {
  const { user } = useAppContext();
  return (
    <section className="mb-28">
      <div
        className="relative overflow-hidden bg-no-repeat bg-cover bg-bottom"
        style={{
          backgroundImage: "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
          backgroundPositionY: "75%",
          height: "350px",
        }}
      ></div>

      <div className="container mx-auto pt-8">
        <div className="text-center text-gray-800">
          <div
            className="block rounded-lg mx-auto shadow-lg space-y-3 max-w-6xl py-10 w-full"
            style={{
              marginTop: "-170px",
              background: "hsla(0, 0%, 100%, 0.7)",
              backdropFilter: "blur(30px)",
            }}
          >
            <h1 className="text-5xl md:text-4xl xl:text-4xl font-bold tracking-tight">
              Party Search <br /> Search for the best parties <br />
              <span className="text-primary">around you</span>
            </h1>
            {!user ? (
              <Link
                className="inline-block px-7 py-3 bg-primary mb-2 md:mb-0 mr-0 md:mr-2 text-white font-medium text-sm hover:bg-blue-700 leading-snug uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                to="/register"
                role="button"
              >
                Register
              </Link>
            ) : (
              <></>
            )}

            <a
              className="inline-block px-7 py-3 text-primary font-medium text-sm leading-snug bg-transparent  font-medium text-xs leading-tight uppercase rounded  hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              href="#search-section"
              role="button"
            >
              Search now!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
