import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { Movies } from "./Movies";
import { Popup } from "./Popup";

const Row = ({ title, fecthURL }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fecthURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fecthURL]);
  const slider = useRef();
  const slideLeft = () => {
    slider.current.scrollLeft = slider.current.scrollLeft - 500;
  };
  const slideRight = () => {
    slider.current.scrollLeft = slider.current.scrollLeft + 500;
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className=" flex items-center group ">
        <MdChevronLeft
          className=" bg-black/20 absolute  hover:opacity-100 cursor-pointer z-[99999] hidden group-hover:block h-[100px] text-white hover:scale-[1.2]"
          size={40}
          onClick={slideLeft}
        />
        <div
          ref={slider}
          className="w-full h-full overflow-y-visible overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide overflow-visible"
        >
          {movies.map((item, index) => (
            <Movies item={item} index={index} />
          ))}
        </div>
        <MdChevronRight
          className="bg-black/20 absolute right-0 hover:opacity-100 cursor-pointer z-[99999] hidden group-hover:block h-[100px] text-white hover:scale-[1.2]"
          size={40}
          onClick={slideRight}
        />
      </div>
    </>
  );
};
export default Row;
