import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";


const temples = [

  {
    name: "Kedarnath Temple",
    location: "Uttarakhand",
    image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a"
  },

  {
    name: "Badrinath Temple",
    location: "Uttarakhand",
    image: "https://images.unsplash.com/photo-1627894483216-2138af692e32"
  },

  {
    name: "Tirupati Balaji",
    location: "Andhra Pradesh",
    image: "https://images.unsplash.com/photo-1615378539073-8c0b3b5b7e33"
  },

  {
    name: "Golden Temple",
    location: "Amritsar",
    image: "https://images.unsplash.com/photo-1589308078054-8321c87b7d9e"
  },

  {
    name: "Somnath Temple",
    location: "Gujarat",
    image: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f"
  },

  {
    name: "Meenakshi Temple",
    location: "Tamil Nadu",
    image: "https://images.unsplash.com/photo-1567591377721-c011a89f5dcb"
  },

  {
    name: "Kashi Vishwanath",
    location: "Varanasi",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc"
  },

  {
    name: "Jagannath Temple",
    location: "Odisha",
    image: "https://images.unsplash.com/photo-1623056615172-3b6cce6b1f7f"
  },

  {
    name: "Rameshwaram Temple",
    location: "Tamil Nadu",
    image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272"
  },

  {
    name: "Vaishno Devi",
    location: "Jammu",
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b"
  },

  {
    name: "Mahakaleshwar",
    location: "Ujjain",
    image: "https://images.unsplash.com/photo-1623841930606-67e2bce48b78"
  },

  {
    name: "Shirdi Sai Baba",
    location: "Maharashtra",
    image: "https://images.unsplash.com/photo-1614145121029-83a9f7b68bf4"
  },

  {
    name: "Siddhivinayak",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a"
  },

  {
    name: "Iskcon Temple",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1627894482768-90d65d7d7c40"
  },

  {
    name: "Akshardham",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220"
  },

  {
    name: "Lotus Temple",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
  },

  {
    name: "Konark Sun Temple",
    location: "Odisha",
    image: "https://images.unsplash.com/photo-1606298855672-3efb63017be8"
  },

  {
    name: "Khatu Shyam",
    location: "Rajasthan",
    image: "https://images.unsplash.com/photo-1612257999762-1e9e82e9f47f"
  },

  {
    name: "Dwarkadhish Temple",
    location: "Gujarat",
    image: "https://images.unsplash.com/photo-1583267746897-2cf415887172"
  },

  {
    name: "Padmanabhaswamy",
    location: "Kerala",
    image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25"
  },

  // add more temples upto 30

  {
    name: "Chamundeshwari",
    location: "Mysore",
    image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450"
  },

  {
    name: "Kalighat Temple",
    location: "Kolkata",
    image: "https://images.unsplash.com/photo-1615897575936-6d6a9c1b3e5d"
  },

  {
    name: "Birla Mandir",
    location: "Hyderabad",
    image: "https://images.unsplash.com/photo-1588402020427-6ec9a7e7e0d1"
  },

  {
    name: "Tiruchendur Temple",
    location: "Tamil Nadu",
    image: "https://images.unsplash.com/photo-1623841930606-67e2bce48b78"
  },

  {
    name: "Gangotri Temple",
    location: "Uttarakhand",
    image: "https://images.unsplash.com/photo-1623841930606-67e2bce48b78"
  },

  {
    name: "Yamunotri Temple",
    location: "Uttarakhand",
    image: "https://images.unsplash.com/photo-1623841930606-67e2bce48b78"
  },

  {
    name: "Lingaraj Temple",
    location: "Odisha",
    image: "https://images.unsplash.com/photo-1623841930606-67e2bce48b78"
  },

  {
    name: "Hampi Temple",
    location: "Karnataka",
    image: "https://images.unsplash.com/photo-1623841930606-67e2bce48b78"
  },

  {
    name: "Chidambaram Temple",
    location: "Tamil Nadu",
    image: "https://images.unsplash.com/photo-1623841930606-67e2bce48b78"
  },

  {
    name: "Murudeshwar Temple",
    location: "Karnataka",
    image: "https://images.unsplash.com/photo-1623841930606-67e2bce48b78"
  }

];



function MoreTemple() {
  return (

    <div>

      <Navbar />

     
     

      <div className="p-10 bg-gray-100 min-h-screen  hover:scale-105 duration-200">

        <h1 className="text-4xl font-bold text-center mb-10 py-10">

          More Famous Temples
         

        </h1>
        <Link to= "/">
       <button className="mt-6 bg-pink-500 text-white px-10 rounded-md hover:bg-pink-700 duration-300 text-center mb-10 py-6">
                Back
      </button>
      
      </Link>

        <div className="grid md:grid-cols-3 gap-8">


          {temples.map((temple,index) => (

            <div key={index} className="card bg-white shadow-xl  hover:scale-105 duration-200">

              <figure>

                <img

                  src={temple.image}

                  alt={temple.name}

                  className="h-60 w-full object-cover"

                />

              </figure>


              <div className="card-body">

                <h2 className="card-title">

                  {temple.name}

                </h2>

                <p>{temple.location}</p>

                <button className="btn btn-primary hover:bg-pink-500 hover:text-white">

                  Book Darshan

                </button>

              </div>

            </div>

          ))}


        </div>

      </div>


      <Footer />

    </div>

  );

}

export default MoreTemple;