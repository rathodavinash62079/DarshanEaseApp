import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Contact = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !subject || !message) {
      setError("Please complete all fields");
      return;
    }
    setSent(true);
    setName(""); setEmail(""); setSubject(""); setMessage("");
  };

  return (

    <>

      <Navbar />


      <div className="min-h-screen flex justify-center items-center bg-gray-100">


        <div className="bg-white p-8 rounded-lg shadow-md w-[420px]">


          <h1 className="text-3xl font-semibold text-center mb-6">

            Contact Us

          </h1>

          {sent && (
            <div className="alert alert-success mb-4">
              <span>Thanks for contacting us. We will get back to you soon.</span>
            </div>
          )}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="Enter your name"
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Email address"
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e)=>setSubject(e.target.value)}
                placeholder="Subject"
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Message</label>
              <textarea
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
                placeholder="Type your message"
                className="textarea textarea-bordered w-full"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Send Message
            </button>
          </form>


        </div>


      </div>


    </>

  );

};

export default Contact;
