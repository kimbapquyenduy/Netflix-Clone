import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../Context/AuthContext";
import { db } from "../Firebase";
import { AiOutlineClose } from "react-icons/ai";
export const SaveMovies = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  const slider = useRef();
  const slideLeft = () => {
    slider.current.scrollLeft = slider.current.scrollLeft - 500;
  };
  const slideRight = () => {
    slider.current.scrollLeft = slider.current.scrollLeft + 500;
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.saveMovies);
    });
  }, [user?.email]);

  const moviesRef = doc(db, "users", `${user?.email}`);
  const deleteMovie = async (id) => {
    try {
      const result = movies.filter((item) => item.id !== id);
      await updateDoc(moviesRef, {
        saveMovies: result,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">My Show</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
          onClick={slideLeft}
        />
        <div
          ref={slider}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => (
            <div
              key={id}
              className="w-[160px] sm:w-[200px] inline-block cursor-pointer relative p-2"
            >
              <img
                className="w-full h-auto block"
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item?.title ? item?.title : item.name}
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-[#1b1b1b]/70 opacity-0 hover:opacity-100 text-white">
                <p className=" whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center  ">
                  {item?.title ? item?.title : item.name}
                </p>
                <p
                  onClick={() => deleteMovie(item.id)}
                  className="absolute text-gray-400 top-4 right-4"
                >
                  <AiOutlineClose />
                </p>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
          onClick={slideRight}
        />
      </div>
    </>
  );
};
