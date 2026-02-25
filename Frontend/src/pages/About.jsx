import React from "react";
import Navbar from "../components/Navbar";

const About = () => {

  return (

    <>

      <Navbar />


      <div className="min-h-screen flex justify-center items-center bg-gray-100">


        <div className="bg-white p-10 shadow-md rounded-lg max-w-2xl">


          <h1 className="text-3xl font-bold mb-4">

            About Darshan Ease

          </h1>


          <p className="mb-3">

            Darshan Ease is an online temple booking system that helps devotees book darshan slots easily.

          </p>


          <p className="mb-3">

            It reduces long queues and saves time by allowing users to book darshan from home.

          </p>


          <p>

            This project is built using MERN Stack technology.

          </p>


        </div>


      </div>


    </>

  );

};

export default About;