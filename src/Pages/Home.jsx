import React from "react";
import { Main } from "../Components/Main";
import Rows from "../Components/Rowele";
import requests from "../Requests";

export const Home = () => {
  return (
    <>
      <Main />
      <Rows title="Popular" fecthURL={requests.requestPopulerMovie} />
      <Rows
        title="Trending This Week"
        fecthURL={requests.requestTrendingWeek}
      />
      <Rows title="Top Rate" fecthURL={requests.requestTopRate} />
      <Rows title="Action" fecthURL={requests.requestAction} />
      <Rows title="Popular TV Show " fecthURL={requests.requestPopulerTvShow} />
    </>
  );
};
