import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { Movies } from "./Movies";

const Row = ({ title, fecthURL, tOS }) => {
  const [movies, setMovies] = useState([]);
  const ranMovies = [];

  shuffle(movies).map((i) => {
    if (ranMovies.length < 6) ranMovies.push(i);
  });

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
  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className=" flex items-center group relative w-full">
        {/* <MdChevronLeft
          className=" bg-black/20 absolute top-0 bottom-0  hover:opacity-100 cursor-pointer z-[99999] hidden group-hover:block h-[100%] text-white hover:scale-[1.2]"
          size={40}
          onClick={slideLeft}
        /> */}
        <div
          ref={slider}
          className="w-full h-full overflow-y-visible overflow-x-scroll  scroll-smooth scrollbar-hide overflow-hidden mx-2 flex content-between"
        >
          {ranMovies.map((item, key) => (
            <Movies item={item} key={key} index={key} tOS={tOS} />
          ))}
        </div>
        {/* <MdChevronRight
          className="bg-black/20 absolute right-0 top-0 bottom-0 hover:opacity-100 cursor-pointer z-[99999] hidden group-hover:block h-[100%] text-white hover:scale-[1.2]"
          size={40}
          onClick={slideRight}
        /> */}
      </div>
    </>
  );
};
export default Row;
