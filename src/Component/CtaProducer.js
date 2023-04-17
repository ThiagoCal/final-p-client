import React from "react";
import { Link } from "react-router-dom";

export default function CtaProducer() {
  return (
    <section class="mb-32">
      {/* <style>
      @media (min-width: 992px) {
        #cta-img-nml-50 {
          margin-left: 50px;
        }
      }
    </style> */}

      <div className="flex flex-wrap">
        <div className="grow-0 shrink-0 basis-auto w-full lg:w-5/12 mb-12 lg:mb-0">
          <div className="flex lg:py-12">
            <img
              src="https://mdbootstrap.com/img/new/standard/people/035.jpg"
              className="w-full rounded-lg shadow-lg"
              id="cta-img-nml-50"
              style="z-index: 10"
              alt=""
            />
          </div>
        </div>

        <div className="grow-0 shrink-0 basis-auto w-full lg:w-7/12">
          <div className="bg-blue-600 h-full rounded-lg p-6 lg:pl-12 text-white flex items-center text-center lg:text-left">
            <div className="lg:pl-12">
              <h2 className="text-3xl font-bold mb-6">
                What are you waiting for?
              </h2>
              <p className="mb-6 pb-2 lg:pb-0">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Maxime, sint, repellat vel quo quisquam accusamus in qui at ipsa
                enim quibusdam illo laboriosam omnis. Labore itaque illum
                distinctio eum neque!
              </p>
              <button
                type="button"
                className="inline-block px-7 py-3 border-2 border-white text-white font-medium text-sm leading-snug uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Sign up now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
