import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Main } from "../Components/Main";
import { Popup } from "../Components/Popup";
import Rows from "../Components/Rowele";
import requests from "../Requests";
import axios from "axios";
import Footer from "../Components/Footer";
export const Home = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios.get(requests.requestPopulerTVShow).then((respone) => {
      setMovies((previousState) => (previousState = respone.data.results));
    });
  }, [requests.requestPopulerTVShow]);
  const movie = movies[Math.floor(Math.random() * movies?.length)];
  return (
    <>
      <Main tOS={"tv"} movie={movie} className="h-full " />
      <Rows
        title="Netflix Original Tv Show"
        fecthURL={requests.requestPopulerTVShow}
        tOS={"tv"}
      />
      <Rows
        title="Hot Movies"
        fecthURL={requests.requestNetflixMovies}
        tOS={"movie"}
      />
      <div className="relative">
        <Rows
          title="Trending This Week"
          fecthURL={requests.requestTrendingWeek}
          tOS={"tv"}
        />
        <Rows
          title="Top Rate"
          fecthURL={requests.requestTopRate}
          tOS={"movie"}
        />
        <Rows title="Action" fecthURL={requests.requestAction} tOS={"movie"} />
        <Rows
          title="Popular Movie "
          fecthURL={requests.requestNowPlaying}
          tOS={"movie"}
        />
        <Rows title="Horror" fecthURL={requests.requestHorror} tOS={"movie"} />
        <Rows
          title="Romance"
          fecthURL={requests.requestRomance}
          tOS={"movie"}
        />
      </div>
      <footer className="w-full flex items-end justify-center h-[350px]">
        <Footer />
      </footer>
    </>
  );
};
