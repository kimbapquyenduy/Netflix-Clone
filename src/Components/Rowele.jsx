import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { Movies } from "./Movies";

const Row = ({ title, fecthURL }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fecthURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fecthURL]);
  console.log(movies);
  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center">
        <div
          id={"slider"}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => (
            <Movies key={id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};
export default Row;
