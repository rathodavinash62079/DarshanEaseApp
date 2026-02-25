import React from "react";
import banner from "../assets/banner.jpg";

function Banner() {
  return (

    <div className="w-full h-screen overflow-hidden">

      <div className="relative w-full h-full max-w-[100vw] overflow-hidden">

        {/* Background Image */}
        <img
          src={banner}
          alt="Temple"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

        {/* Content */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center px-10">

          <div className="text-white">

            <h1 className="text-5xl font-bold mb-4">
              Welcome to Darshan Ease
            </h1>
        
        <p lassName="text-2xl mb-400 text-grey-200 leading-relaxed">
            "your spiritual journey begins with a simple click"

        </p>

            <button className="bg-orange-700 px-8 py-3 text-lg rounded-lg hover:bg-orange-600">
                 Book Darshan
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Banner;