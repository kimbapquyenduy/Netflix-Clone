import React from "react";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-8 z-[100] absolute w-full ">
      <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
        Netflix
      </h1>
      <div>
        <button className="text-white pr-4">Sign In</button>
        <button className="bg-red-600 px-6 py-2 cursor-pointer text-white">
          Sign Up
        </button>
      </div>
    </div>
  );
};
