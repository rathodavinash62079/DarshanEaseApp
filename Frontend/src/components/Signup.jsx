import React from "react";

function Signup() {

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
              className="input input-bordered w-full bg-white text-black"
            />

          </div>


          {/* Username */}
          <div>

            <label className="label">Username</label>

            <input
              type="text"
              placeholder="Enter your username"
              className="input input-bordered w-full bg-white text-black"
            />

          </div>


          {/* Email */}
          <div>

            <label className="label">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-white text-black"
            />

          </div>


          {/* Phone */}
          <div>

            <label className="label">Phone Number</label>

            <input
              type="text"
              placeholder="Enter your number"
              className="input input-bordered w-full bg-white text-black"
            />

          </div>


          {/* Password */}
          <div>

            <label className="label">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-white text-black"
            />

          </div>


          {/* Confirm Password */}
          <div>

            <label className="label">Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm your password"
              className="input input-bordered w-full bg-white text-black"
            />

          </div>

        </div>


        {/* Gender */}
        <div className="mt-6">

          <label className="label font-semibold">Gender</label>

          <div className="flex gap-6 mt-2">


            <label className="flex items-center gap-2">

              <input type="radio" name="gender" className="radio" />

              Male

            </label>


            <label className="flex items-center gap-2">

              <input type="radio" name="gender" className="radio" />

              Female

            </label>


            <label className="flex items-center gap-2">

              <input type="radio" name="gender" className="radio" />

              Prefer not to say

            </label>


          </div>

        </div>


        {/* Register Button */}
        <button className="w-full mt-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-400 to-purple-500">

          Register

        </button>


      </div>

    </dialog>

  );

}

export default Signup;