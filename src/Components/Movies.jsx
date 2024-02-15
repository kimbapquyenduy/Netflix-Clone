import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaCirclePlay, FaCirclePlus } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";

import { useState } from "react";
import { UserAuth } from "../Context/AuthContext";
import { db } from "../Firebase";
import { arrayUnion, updateDoc, doc } from "firebase/firestore";
import { Popup } from "./Popup";
import { useEffect } from "react";
import requests from "../Requests";
import axios from "axios";

export const Movies = ({ item }) => {
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [genre, setGenre] = useState([]);
  const [runtime, setRuntime] = useState();
  const { user } = UserAuth();
  useEffect(() => {
    axios.get(requests.requestGenre).then((response) => {
      setGenre(response.data.genres);
    });
  }, [requests.requestGenre]);
  useEffect(() => {
    axios
      .get(
        ` https://api.themoviedb.org/3/movie/${item?.id}?api_key=7452c219263bf44f619c3120bc2b3e4d`
      )
      .then((response) => {
        setRuntime(response.data.runtime);
      });
  }, [
    ` https://api.themoviedb.org/3/movie/${item?.id}?api_key=7452c219263bf44f619c3120bc2b3e4d`,
  ]);

  const movieID = doc(db, "users", `${user?.email}`);
  const saveMovies = async () => {
    if (user?.email) {
      setLike(!like);
      setSave(true);
      await updateDoc(movieID, {
        saveMovies: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Log In To Save Movies!");
    }
  };
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else return str;
  };
  const trasnWatchTime = (totatlminute) => {
    var Hours = Math.floor(totatlminute / 60);
    var minutes = totatlminute % 60;
    return Hours + " hours " + minutes + " minutes";
  };
  return (
    <>
      <div
        className={`group/item w-[160px] sm:w-[200px] inline-block cursor-pointer p-2 `}
        onClick={() => setIsOpen(true)}
      >
        <div className="bg-[#1b1b1b] group-hover/item:absolute group-hover/item:left-[50%]  group-hover/item:top-[50%]  group-hover/item:w-[325px] group-hover/item:h-[300px] hover:shadow hover:shadow-white z-[999]">
          <div className="">
            <img
              className={`w-full h-full block object-cover group-hover/item:h-[50%]  `}
              src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
              alt={item?.title ? item?.title : item.name}
            />
            <div className="hidden group-hover/item:block text-white px-2 pt-2">
              <div className="flex">
                <FaCirclePlay size={35} className="text-sm" />
                <FaCirclePlus
                  size={35}
                  className="bg-white rounded-full text-[#1b1b1b] ml-2"
                />
                <IoIosCheckmarkCircle />
              </div>

              <p className=" whitespace-normal text-xs md:text-sm font-bold">
                {item?.title ? item?.title : item.name}
              </p>
              <p>{trasnWatchTime(runtime)}</p>

              {/* <p className="text-xs break-words whitespace-pre-wrap">
                {truncateString(item.overview, 200)}
              </p> */}

              <p className="text-xm break-words whitespace-pre-wrap font-bold">
                {item?.genre_ids.slice(0, 3).map((genlist) =>
                  genre

                    .filter((obj) => {
                      return obj.id == genlist;
                    })

                    .map((obj, key) => obj.name + " ")
                )}
              </p>
            </div>
          </div>
        </div>
        {/* <p onClick={saveMovies}>
            {like ? (
              <FaHeart className="absolute top-4 left-4 text-gray-400" />
            ) : (
              <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
            )}
          </p> */}
        {/* <div className="absolute top-0 left-0 w-full h-full hover:bg-[#1b1b1b]/70 opacity-0 hover:opacity-100 text-white">
          <div className=" whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center text-center  ">
            {item?.title ? item?.title : item.name}
          </div>
        </div> */}
      </div>

      <Popup setIsOpen={setIsOpen} isOpen={isOpen} item={item} genre={genre} />
    </>
  );
};
