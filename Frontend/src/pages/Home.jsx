import React from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import TempleRow from "../components/TempleRow";
import Banner from "../components/Banner";

import { Link } from "react-router-dom";

import Login from "../components/Login";
import signup from "../components/Signup";



function Home() {

  return (

    <div className="bg-white w-full overflow-hidden">

      

      <Navbar />

  

      <Banner />

      <SearchBar />

      <TempleRow />


      {/* BUTTON FIXED */}

      <div className="text-center m-10">

        <Link to="/more-temples">

          <button className="btn btn-warning">

            More Temples

          </button>

        </Link>

      </div>


      <Footer />

    </div>

  );

}

export default Home;