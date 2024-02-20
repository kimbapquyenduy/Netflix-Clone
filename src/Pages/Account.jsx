import React from "react";
import { SaveMovies } from "../Components/SaveMovies";

export const Account = () => {
  return (
    <>
      <div className="w-full text-white">
        <img
          className=" w-full h-[400px] object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9134db96-10d6-4a64-a619-a21da22f8999/3bc4304a-4835-4a58-9115-10dd7af3a9e5/VN-vi-20240115-trifectadaily-perspective_alpha_website_large.jpg"
          alt=""
        />
        <div className="bg-black/60 absolute top-0 left-0 w-full h-[400px]"></div>
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold">My Movies</h1>
        </div>
      </div>
      <div></div>
      <SaveMovies />
    </>
  );
};
