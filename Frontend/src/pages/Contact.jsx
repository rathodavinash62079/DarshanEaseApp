import React from "react";
import Navbar from "../components/Navbar";

const Contact = () => {

  return (

    <>

      <Navbar />


      <div className="min-h-screen flex justify-center items-center bg-gray-100">


        <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">


          <h1 className="text-3xl font-semibold text-center mb-6">

            Contact Us

          </h1>


          {/* Name */}
          <div className="mb-4">

            <label className="block mb-1">

              Name

            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full"
            />

          </div>


          {/* Email */}
          <div className="mb-4">

            <label className="block mb-1">

              Email

            </label>

            <input
              type="email"
              placeholder="Email address"
              className="input input-bordered w-full"
            />

          </div>


          {/* Message */}
          <div className="mb-4">

            <label className="block mb-1">

              Message

            </label>

            <textarea
              placeholder="Type your message"
              className="textarea textarea-bordered w-full"
            />

          </div>


          {/* Button */}
          <button className="btn btn-primary w-full">

            Submit

          </button>


        </div>


      </div>


    </>

  );

};

export default Contact;