import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "./AppContext";

const Navbar2 = (props) => {
  const { isLogged, user } = useAppContext();
  const [options, setOptions] = useState(true);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const option = () => {
    console.log("hi");
    setOptions(!options);
  };

  const handleAction = async () => {
    try {
      let res = await axios.get("/logout");
      setOptions(!options);
      navigate("/login");
    } catch (err) {
      console.log(err.response.data);
      setMsg(err.response.data.msg);
    }
  };

  return (
    <>
      <nav
        class="flex-no-wrap relative flex w-full items-center justify-between bg-neutral-100 mb-4 py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4"
        data-te-navbar-ref
      >
        <div class="flex w-full flex-wrap items-center justify-between px-3 mx-5">
          <button
            class="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            data-te-collapse-init
            data-te-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="[&>svg]:w-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-7 w-7"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </button>

          <div
            class="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto ml-5"
            id="navbarSupportedContent1"
            data-te-collapse-item
          >
            <a
              class="mb-4 mr-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
              href="#"
            >
              <img
                src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
                style={{ height: "15px" }}
                alt=""
                loading="lazy"
              />
            </a>

            <ul
              class="list-style-none mr-auto flex flex-col pl-0 lg:flex-row"
              data-te-navbar-nav-ref
            >
              <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <Link
                  to="/"
                  className=" text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
                  data-te-nav-link-ref
                >
                  Home
                </Link>
              </li>

              <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <Link
                  to="/create-party"
                  className=" text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
                  data-te-nav-link-ref
                >
                  Create Party
                </Link>
              </li>

              <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <Link
                  to="/"
                  className=" text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
                  data-te-nav-link-ref
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div class="relative flex items-center">
            <div class="relative">
              {!isLogged ? (
                <ul
                  class="list-style-none mr-auto flex flex-col pl-0 lg:flex-row "
                  data-te-navbar-nav-ref
                >
                  <li class="mb-4 lg:mb-0 lg:pr-2 ml-5" data-te-nav-item-ref>
                    <Link
                      to="/login"
                      className=" text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
                      data-te-nav-link-ref
                    >
                      Log In
                    </Link>
                  </li>

                  <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                    <Link
                      to="/register"
                      className=" text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
                      data-te-nav-link-ref
                    >
                      Sign Up
                    </Link>
                  </li>
                </ul>
              ) : (
                <div class="relative">
                  <div>
                    <button
                      type="button"
                      onClick={option}
                      class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                    >
                      <img
                        src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                        class="rounded-full"
                        style={{ height: "25px", width: "25px" }}
                        alt=""
                        loading="lazy"
                      />
                      <svg
                        class="-mr-1 h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  {!options ? (
                    <div
                      className={
                        "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      }
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabindex="-1"
                    >
                      <div class="py-1" role="none">
                        <Link
                          to="/"
                          class="text-gray-700 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-0"
                        >
                          Profile Page
                        </Link>
                        <button
                          type="button"
                          class="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-3"
                          onClick={() => handleAction()}
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar2;
