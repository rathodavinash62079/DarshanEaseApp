import React from "react";
import Navbar from "../components/Navbar";

const About = () => {

  return (

    <>

      <Navbar />


      <div className="min-h-screen flex justify-center items-center bg-gray-100">


        <div className="bg-white p-10 shadow-md rounded-lg max-w-3xl">


          <h1 className="text-3xl font-bold mb-4">

            About Darshan Ease

          </h1>


          <p className="mb-3">

            Darshan Ease is a simple, user-friendly temple darshan booking platform designed to make spiritual visits organized and effortless. Devotees can browse famous temples, view details, and secure time slots without long queues.

          </p>


          <p className="mb-3">

            Our goal is to reduce waiting time at temples and ensure a smooth darshan experience through reliable scheduling and clear communication.

          </p>


          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Key Features</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Browse and search popular temples across India</li>
              <li>Book darshan with preferred date and time slot</li>
              <li>Secure authentication and easy account management</li>
              <li>Responsive, clean design for mobile and desktop</li>
            </ul>
          </div>

          <p className="mb-3">

            Built with the MERN stack (MongoDB, Express, React, Node), Darshan Ease focuses on performance, accessibility, and a clear booking flow.

          </p>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Social Impact</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Enables devotees who cannot travel to access temples online</li>
              <li>Reduces crowding and waiting time at temple premises</li>
              <li>Promotes inclusive spiritual access through virtual darshan</li>
            </ul>
          </div>


        </div>


      </div>


    </>

  );

};

export default About;
