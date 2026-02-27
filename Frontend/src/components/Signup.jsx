import React, { useState } from "react";
import { api } from "../lib/api";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !confirm) {
      setError("Please fill all fields");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      const { data } = await api.post("/api/auth/register", { name, email, password });
      if (data?.token) localStorage.setItem("darshan_token", data.token);
      if (data?.user) localStorage.setItem("darshan_user", JSON.stringify(data.user));
      if (!data?.user) {
        const user = { name, email };
        localStorage.setItem("darshan_user", JSON.stringify(user));
      }
      document.getElementById("register_modal")?.close();
      alert("Registered successfully");
    } catch {
      const user = { name, email };
      localStorage.setItem("darshan_user", JSON.stringify(user));
      document.getElementById("register_modal")?.close();
      alert("Registered (offline mode)");
    }
  };

  const openLogin = () => {
    document.getElementById("register_modal")?.close();
    document.getElementById("my_modal_3")?.showModal();
  };

  return (

    <dialog id="register_modal" className="modal modal-middle">

      <div className="modal-box max-w-3xl bg-white text-black p-8">

        {/* Close Button */}
        <form method="dialog">

          <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">
            ✕
          </button>

        </form>


        {/* Title */}
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
          Registration
        </h2>


        {/* Form Grid */}
        <div className="grid grid-cols-2 gap-4">


          {/* Full Name */}
          <div>

            <label className="label">Full Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full bg-white text-black"
            />

          </div>


          {/* Email */}
          <div>

            <label className="label">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full bg-white text-black"
            />

          </div>


          {/* Password */}
          <div>

            <label className="label">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full bg-white text-black"
            />

          </div>


          {/* Confirm Password */}
          <div>

            <label className="label">Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="input input-bordered w-full bg-white text-black"
            />

          </div>

        </div>

        {/* Register Button */}
        {error && (
          <div className="alert alert-error mt-4">
            <span>{error}</span>
          </div>
        )}

        <button onClick={handleRegister} className="w-full mt-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-400 to-purple-500">

          Register

        </button>

        <div className="text-center mt-4 text-sm">
          <span className="mr-2">Already have an account?</span>
          <button onClick={openLogin} className="btn btn-link text-blue-600 no-underline">
            Login
          </button>
        </div>

      </div>

    </dialog>

  );

}

export default Signup;
