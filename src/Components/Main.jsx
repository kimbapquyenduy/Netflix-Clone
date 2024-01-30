import React from "react";
import { useState } from "react";
import requests from "../Requests.js";
import axios from "axios";
export const Main = () => {
  const [movies, setMovies] = useState([]);
  const movie = movies[Math.floor(Math.random() * movies?.length)];
  useState(() => {
    axios.get(requests.requestPopulerMovie).then((respone) => {
      setMovies(respone.data.results);
    });
  }, []);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else return str;
  };
  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full ">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.name}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">{movie?.name}</h1>
          <div className="my-4">
            <button className="border bg-white text-black border-gray-300 px-6 py-2 hover:bg-slate-300 transition-all">
              Play
            </button>
            <button className="border bg-transparent border-gray-300  px-6 py-2 ml-2 hover:bg-black transition-all">
              Watch Later
            </button>
          </div>
          <p className="text-gray-400 text-sa">
            Release: {movie?.release_date}
          </p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[40%]">
            {truncateString(movie?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
};
