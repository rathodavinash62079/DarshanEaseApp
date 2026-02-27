import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { api } from "../lib/api";


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
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email,    setEmail] = useState("");
  const [phone,    setPhone] = useState("");
  const [date,     setDate] = useState("");
  const [time,     setTime] = useState("");
  const [service,  setService] = useState("");
  const [step,     setStep] = useState("form");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error,    setError] = useState("");
  const [success,  setSuccess] = useState("");
  const [extraTemples, setExtraTemples] = useState([]);
  const [templeList, setTempleList] = useState([]);

  const slugify = useMemo(() => (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""), []);
  const basePrice = (type) => {
    if (type === "Special Puja") return 500;
    if (type === "Accommodation") return 300;
    return 100;
  };
  const loyalty = (() => {
    try { return JSON.parse(localStorage.getItem("darshan_bookings") || "[]").length * 10; } catch { return 0; }
  })();
  const discount = loyalty >= 50 ? 0.1 : 0;
  const amount = Math.max(0, Math.round(basePrice(service || "Darshan") * (1 - discount)));

  React.useEffect(() => {
    try {
      const extras = JSON.parse(localStorage.getItem("admin_temples") || "[]");
      setExtraTemples(Array.isArray(extras) ? extras : []);
    } catch {
      setExtraTemples([]);
    }
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/temples");
        if (Array.isArray(data) && data.length) {
          setTempleList(data);
          return;
        }
        setTempleList([]);
      } catch (e) {
        void e;
        setTempleList([]);
      }
    })();
  }, []);

  const openBooking = (temple) => {
    setSelectedTemple(temple);
    setError("");
    setSuccess("");
    setStep("form");
    setPaymentMethod("");
    document.getElementById("mt_booking_modal")?.showModal();
  };

  const confirmBooking = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!fullName || !email || !phone || !date || !time || !service) {
      setError("Please fill all required fields");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError("Phone must be 10 digits");
      return;
    }
    setStep("payment");
  };

  const doPayment = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      setError("Please select a payment method");
      return;
    }
    const booking = {
      temple: selectedTemple?.name,
      fullName,
      email,
      phone,
      date,
      time,
      service,
      amount,
      paymentMethod,
      createdAt: new Date().toISOString(),
    };
    try {
      const existing = JSON.parse(localStorage.getItem("darshan_bookings") || "[]");
      existing.push(booking);
      localStorage.setItem("darshan_bookings", JSON.stringify(existing));
  } catch (e) { void e; }
    try {
      api.post("/api/book", booking).catch(()=>{});
    } catch (e) { void e; }
    setSuccess(`Payment confirmed. Booking for ${selectedTemple?.name} on ${date} at ${time}`);
    setFullName(""); setEmail(""); setPhone(""); setDate(""); setTime(""); setService(""); setPaymentMethod("");
    setTimeout(() => {
      document.getElementById("mt_booking_modal")?.close();
      setStep("form");
    }, 1000);
  };

  return (

    <div>

      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

     
     

      <div className="p-10 bg-gray-100 min-h-screen hover:scale-105 duration-200 pt-28">

        <h1 className="text-4xl font-bold text-center mb-40 py-10">

          More Famous Temples
         

        </h1>
        <Link to= "/">
       <button className="mt-6 bg-pink-500 text-white px-10 rounded-md hover:bg-pink-700 duration-300 text-center mb-10 py-6">
                Back
      </button>
      
      </Link>

        <div className="grid md:grid-cols-3 gap-8">


          {(templeList.length ? templeList : [...temples, ...extraTemples]).map((temple,index) => (

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

                  <Link to={`/temple/${slugify(temple.name)}`}>{temple.name}</Link>

                </h2>

                <p>{temple.location}</p>

                <button
                  onClick={() => openBooking(temple)}
                  className="btn btn-primary hover:bg-pink-500 hover:text-white">

                  Book Darshan

                </button>

              </div>

            </div>

          ))}


        </div>

        {/* Booking Modal */}
        <dialog id="mt_booking_modal" className="modal modal-middle">
          <div className="modal-box bg-white text-black max-w-lg">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">✕</button>
            </form>
            <h3 className="font-bold text-lg mb-4">Book Darshan</h3>
            {selectedTemple && (
              <div className="mb-3">
                <label className="label">Temple</label>
                <input readOnly value={selectedTemple.name} className="input input-bordered w-full bg-gray-100 text-black" />
              </div>
            )}
            {error && (
              <div className="alert alert-error mb-3">
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="alert alert-success mb-3">
                <span>{success}</span>
              </div>
            )}
            {step === "form" && (
            <div className="space-y-3">
              <div>
                <label className="label">Your Name</label>
                <input
                  value={fullName}
                  onChange={(e)=>setFullName(e.target.value)}
                  placeholder="Enter your name"
                  className="input input-bordered w-full bg-white text-black"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="input input-bordered w-full bg-white text-black"
                  />
                </div>
                <div>
                  <label className="label">Phone</label>
                  <input value={phone} onChange={(e)=>setPhone(e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="10-digit phone" className="input input-bordered w-full bg-white text-black"/>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="label">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e)=>setDate(e.target.value)}
                    className="input input-bordered w-full bg-white text-black"
                  />
                </div>
                <div>
                  <label className="label">Time Slot</label>
                  <select
                    value={time}
                    onChange={(e)=>setTime(e.target.value)}
                    className="select select-bordered w-full bg-white text-black"
                  >
                    <option value="" disabled>Select a slot</option>
                    <option>06:00 AM - 07:00 AM</option>
                    <option>07:00 AM - 08:00 AM</option>
                    <option>10:00 AM - 11:00 AM</option>
                    <option>04:00 PM - 05:00 PM</option>
                    <option>06:00 PM - 07:00 PM</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Service Type</label>
                <select
                  value={service}
                  onChange={(e)=>setService(e.target.value)}
                  className="select select-bordered w-full bg-white text-black"
                >
                  <option value="" disabled>Select a service</option>
                  <option>Darshan</option>
                  <option>Special Puja</option>
                  <option>Accommodation</option>
                </select>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="badge badge-ghost p-3">Loyalty: {loyalty} pts {discount ? "(10% off)" : ""}</div>
                <div className="badge badge-primary p-3">Amount: ₹{amount}</div>
              </div>
              <button onClick={confirmBooking} className="btn btn-primary w-full mt-2">Proceed to Payment</button>
          </div>
            )}
            {step === "payment" && (
              <form onSubmit={doPayment} className="space-y-3">
                <div className="stats shadow w-full">
                  <div className="stat">
                    <div className="stat-title">Payable Amount</div>
                    <div className="stat-value">₹{amount}</div>
                    {discount ? <div className="stat-desc">Includes 10% loyalty discount</div> : null}
                  </div>
                </div>
                <div>
                  <label className="label">Payment Method</label>
                  <select value={paymentMethod} onChange={(e)=>setPaymentMethod(e.target.value)} className="select select-bordered w-full bg-white text-black">
                    <option value="" disabled>Select a method</option>
                    <option>Card</option>
                    <option>UPI</option>
                    <option>NetBanking</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-success w-full mt-2">Pay Now</button>
                <button type="button" onClick={()=>setStep("form")} className="btn btn-ghost w-full">Back</button>
              </form>
            )}
          </div>
        </dialog>

      </div>



      <Footer />

    </div>

  );

}

export default MoreTemple;
