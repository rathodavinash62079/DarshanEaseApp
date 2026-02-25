import React from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

function Login() {

  return (

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
          className="input input-bordered w-full bg-white text-black placeholder-gray-400 focus:bg-white focus:text-black"
        />


        {/* Password */}
       <input
  type="password"
  placeholder="Password"
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


        {/* Login Button */}
        <button className="btn w-full bg-pink-500 text-white border-none hover:bg-pink-600 mb-4">
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
        <p className="text-center mt-6 text-sm">
          Not a member?
           <Link to="/more-temples">

          <button className="btn btn-warning">

            More Temples

          </button>
        </p>


      </div>

    </dialog>

  );

}

export default Login;