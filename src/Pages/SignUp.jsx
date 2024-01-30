import React from "react";
import { Link } from "react-router-dom";

export const SignUp = () => {
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
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <form className="w-full flex flex-col py-4">
                <input
                  className="p-3 my-2 bg-gray-200 rounded"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />
                <input
                  className="p-3 my-2 bg-gray-200 rounded"
                  type="password"
                  placeholder="Password"
                />
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
                  <span className="text-gray-600 mr-1">
                    Already Subcribe To Netflix?
                  </span>
                  <Link to={"/login"}>Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};
