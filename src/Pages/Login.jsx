import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
function Login() {
  const { user, logIn } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nagivate = useNavigate();
  const OnSubmit = async (e) => {
    try {
      e.preventDefault();
      await logIn(email, password);
      setError("");
      nagivate("/");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-full h-full">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9134db96-10d6-4a64-a619-a21da22f8999/3bc4304a-4835-4a58-9115-10dd7af3a9e5/VN-vi-20240115-trifectadaily-perspective_alpha_website_large.jpg"
          alt=""
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-full"></div>
        <div className="w-full fixed p-4 py-24 z-50">
          <div className="max-w-[450px] h-[500px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Sign In</h1>
              <form onSubmit={OnSubmit} className="w-full flex flex-col py-4">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 my-2 bg-gray-200 rounded text-black"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 my-2 bg-gray-200 rounded text-black"
                  type="password"
                  placeholder="Password"
                />
                {error && <p className=" p-2 bg-red-400 my-2">{error}</p>}
                <button className="bg-red-600 py-3 my-6 rounded font-bold">
                  Sign Up
                </button>
                <div className="flex justify-between items-center">
                  <p className="text-sm">
                    <input type="checkbox" className="mr-2" />
                    Remember Me
                  </p>
                  <p className="text-sm">Need Help?</p>
                </div>
                <p className="text-white py-6 text-sm">
                  <span className="text-gray-600 mr-1">New To Netflix?</span>
                  <Link to={"/signup"}>Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}

export default Login;
