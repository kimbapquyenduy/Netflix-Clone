import React from "react";
import { Main } from "../Components/Main";
import { Popup } from "../Components/Popup";
import Rows from "../Components/Rowele";
import requests from "../Requests";

export const Home = () => {
  return (
    <>
      <Main />

      <Rows
        title="Trending This Week"
        fecthURL={requests.requestTrendingWeek}
      />
      <Rows title="Top Rate" fecthURL={requests.requestTopRate} />
      <Rows title="Action" fecthURL={requests.requestAction} />
      <Rows title="Popular Movie " fecthURL={requests.requestNowPlaying} />
      <Rows title="Horror" fecthURL={requests.requestHorror} />
      <Rows title="Romance" fecthURL={requests.requestRomance} />
    </>
  );
};
