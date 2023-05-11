import React from "react";

export default function AboutUs() {
  return (
    <div class="container mx-auto">
      <div class="about-us-blue">
        <div className="flex flex-col">
          <h2>About Us</h2>
          <p>
            Welcome to Messiba Pal app! We're glad you're interested in joining
            our community. When you sign up, you'll have the option to register
            as either a producer or a user. Producers have the ability to create
            parties and events within the app. This means they can set the date,
            time, location, and any other important details for their party.
            Producers can also manage their guest list and communicate with
            attendees.
          </p>
        </div>
        <img
          src={`${process.env.REACT_APP_SERVERURL}${"party-producer.png"}`}
          alt="Image on the right"
        />
      </div>
      <div class="about-us-white">
        <img
          src={`${process.env.REACT_APP_SERVERURL}${"party-search-1.png"}`}
          alt="Image on the left"
          max-height={"100px"}
        />
        <div className="flex flex-col">
          <h2>Users</h2>
          <p>
            Users, on the other hand, can search for parties and events that
            interest them. They can view the details of each party, such as the
            theme, location, and time. Users can save parties they're interested
            in and favorite those they which to attend. Whether you're looking
            to host a party or simply attend one, our app has you covered. So,
            choose your account type and join the party!
          </p>
        </div>
      </div>
    </div>
  );
}
