import React, { useState } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { api } from "../lib/api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    const gmailOk = /^[A-Za-z0-9._%+-]+@gmail\.com$/i.test(email);
    if (!gmailOk) {
      setError("Invalid email. Use a @gmail.com address");
      return;
    }
    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      if (data?.token) localStorage.setItem("darshan_token", data.token);
      if (data?.user) localStorage.setItem("darshan_user", JSON.stringify(data.user));
      if (!data?.user) {
        const user = { email };
        localStorage.setItem("darshan_user", JSON.stringify(user));
      }
      window.dispatchEvent(new Event("darshan-auth-change"));
      document.getElementById("my_modal_3")?.close();
      document.getElementById("login_success_modal")?.showModal();
    } catch (err) {
      let msg = err?.response?.data?.message || err?.response?.data?.error || "Login failed";
      if (/invalid password/i.test(msg)) {
        setError("Invalid password");
      } else if (/not registered/i.test(msg)) {
        setError("User not registered, please signup first");
      } else {
        setError(msg);
      }
    }
  };

  const openSignup = () => {
    document.getElementById("my_modal_3")?.close();
    document.getElementById("register_modal")?.showModal();
  };

  return (
    <>
    <dialog id="my_modal_3" className="modal modal-middle">

      <div className="modal-box bg-white text-black p-10 max-w-md relative overflow-hidden">


        {/* Close */}
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">
            ✕
          </button>
        </form>


        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6">
          LOGIN
        </h2>


        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full bg-white text-black placeholder-gray-400 focus:bg-white focus:text-black"
        />


        {/* Password */}
       <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="input input-bordered w-full mb-4 bg-white text-black placeholder-gray-400 focus:bg-white focus:text-black"
/>


        {/* Remember */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            defaultChecked
            className="checkbox checkbox-primary mr-2"
          />
          Remember me
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-error mb-3">
            <span>{error}</span>
          </div>
        )}

        {/* Login Button */}
        <button onClick={handleLogin} className="btn w-full bg-pink-500 text-white border-none hover:bg-pink-600 mb-4">
          LOGIN
        </button>


        {/* OR */}
        <p className="text-center mb-4 text-black">
          Or login with
        </p>


        {/* Social Buttons with Logos */}
        <div className="flex flex-col gap-3 w-full">


          {/* Facebook */}
          <button className="btn w-full flex items-center justify-center gap-2 ">

            <FaFacebookF className="text-blue-600" />

            Facebook

          </button>



          {/* Google */}
          <button className="btn w-full flex items-center justify-center gap-2 ">

            <FaGoogle className="text-red-500" />

            Google

          </button>


        </div>


        {/* Signup */}
        <div className="text-center mt-6 text-sm">
          <span className="mr-2">Not a member?</span>
          <button onClick={openSignup} className="btn btn-link text-blue-600 no-underline">
            Go to Signup
          </button>
        </div>


      </div>

    </dialog>

    <dialog id="login_success_modal" className="modal modal-middle">
      <div className="modal-box bg-white text-black p-10 max-w-md">
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-full bg-green-100 p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.3 7.3-5 5a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.4l1.3 1.29 4.3-4.29a1 1 0 1 1 1.4 1.4Z"/>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-green-600 text-center">Login successful!</h3>
          <p className="text-center text-gray-600">You are now signed in to Darshan Ease.</p>
          <form method="dialog" className="mt-2">
            <button className="btn btn-success w-32">Ok</button>
          </form>
        </div>
      </div>
    </dialog>
    </>
  );

}

export default Login;
