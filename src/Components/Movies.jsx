import React from "react";
import {
  FaCirclePlay,
  FaCirclePlus,
  FaCircleChevronDown,
} from "react-icons/fa6";
import { IoIosCheckmark } from "react-icons/io";
import YouTube from "react-youtube";
import { useState } from "react";
import { UserAuth } from "../Context/AuthContext";
import { db } from "../Firebase";
import { arrayUnion, updateDoc, doc } from "firebase/firestore";
import { Popup } from "./Popup";
import { useEffect } from "react";
import requests from "../Requests";
import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";

export const Movies = ({ item, key, index, tOS }) => {
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [genre, setGenre] = useState([]);
  const [runtime, setRuntime] = useState();
  const [epNum, setEpNum] = useState();
  const { user } = UserAuth();
  const Hoverpop = useRef();

  const handleMouseMove = (event) => {
    const x = Hoverpop.current.getBoundingClientRect().x;
    if (index === 0) {
      Hoverpop.current.style.left = x + "px";
    } else if (index === 5) {
      Hoverpop.current.style.left = 78 + "%";
    } else {
      Hoverpop.current.style.left = x - 50 + "px";
    }
  };
  const handleMouseleave = (event) => {
    const x = Hoverpop.current.getBoundingClientRect().x;
    Hoverpop.current.style.left = x + "px";
  };
  useEffect(() => {
    axios.get(requests.requestGenre).then((response) => {
      setGenre(response.data.genres);
    });
  }, [requests.requestGenre]);
  if (tOS == "tv") {
    useEffect(() => {
      axios
        .get(
          ` https://api.themoviedb.org/3/tv/${item?.id}?api_key=7452c219263bf44f619c3120bc2b3e4d`
        )
        .then((response) => {
          setEpNum(response.data.number_of_episodes);
        });
    }, [
      ` https://api.themoviedb.org/3/movie/${item?.id}?api_key=7452c219263bf44f619c3120bc2b3e4d`,
    ]);
  } else if (tOS == "movie") {
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
  }

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

  const trasnWatchTime = (totatlminute) => {
    var Hours = Math.floor(totatlminute / 60);
    var minutes = totatlminute % 60;
    return Hours + " hours " + minutes + " minutes";
  };
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
    },
  };
  return (
    <>
      <div
        className={`group/item h-full w-[200px] sm:w-full inline-block  p-1  `}
        onMouseEnter={() => handleMouseMove()}
        onMouseOut={() => handleMouseleave()}
      >
        <div
          ref={Hoverpop}
          className={`bg-[#1b1b1b]  transition duration-500 ease-out group-hover/item:absolute group-hover/item:top-[-100px]  group-hover/item:w-[320px] group-hover/item:h-[400px] group-hover/item:shadow-md group-hover/item:shadow-black rounded z-[999] 2xl:group-hover/item:w-[21vw] 2xl:group-hover/item:h-[24rem] xl:group-hover/item:w-[21vw] xl:group-hover/item:h-[19rem] lg:group-hover/item:w-[21vw] lg:group-hover/item:h-[15rem]`}
        >
          <img
            className={`w-full  block object-cover group-hover/item:h-[50%] group-hover/item:rounded  cursor-pointer `}
            src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
            alt={item?.title ? item?.title : item.name}
          />
          {/* <YouTube
            videoId="edyqWHRgSX8"
            opts={opts}
            className="hidden group-hover/item:block w-full h-[170px] object-cover"
          /> */}
          {/* <iframe
            src="https://www.youtube.com/embed/eSIJddEieLI? 
                            autoplay=1&mute=1"
            title="YouTube video player"
            allow="autoplay; encrypted-media"
            frameborder="0"
            className="hidden group-hover/item:block w-full h-[170px] object-cover "
          ></iframe> */}
          <div className="hidden group-hover/item:block text-white px-2 pt-2 ">
            <div className="flex m-3 z-[99999] ">
              <Link to={`/watch/${tOS}/${item?.id}`}>
                <FaCirclePlay
                  size={45}
                  className="text-sm cursor-pointer  hover:text-white/70 transition duration-200 "
                />
              </Link>
              {like ? (
                <IoIosCheckmark
                  className="text-white rounded-full bg-[#1b1b1b] p-0 ml-2 cursor-pointer border-2 border-[#a4a4a4] hover:border-[#fff]  transition duration-200"
                  size={45}
                />
              ) : (
                <FaCirclePlus
                  onClick={saveMovies}
                  size={45}
                  className="bg-white rounded-full text-[#1b1b1b] ml-2 z-50 cursor-pointer border-2 border-[#a4a4a4] hover:border-[#fff] hover:text-[#141414] transition duration-200"
                />
              )}

              <FaCircleChevronDown
                onClick={() => setIsOpen(true)}
                size={45}
                className="text-sm cursor-pointer absolute right-7 bg-white rounded-full text-[#1b1b1b]  border-2 border-[#a4a4a4] hover:border-[#fff] hover:text-[#141414] transition duration-200"
              />
            </div>
            <div className="m-3 flex justify-between flex-col h-100%">
              <p className=" whitespace-normal text-xs md:text-lg font-bold  max-w-60">
                {item?.title ? item?.title : item.name}
              </p>
              <p className="my-1 text-[#b4b4b4]">
                {tOS == "tv" ? epNum + " Episode" : trasnWatchTime(runtime)}
              </p>

              {/* <p className="text-xs break-words whitespace-pre-wrap">
                {truncateString(item.overview, 200)}
              </p> */}

              <p className="text-base break-words whitespace-pre-wrap font-bold ">
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

      <Popup
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        item={item}
        genre={genre}
        tOS={tOS}
        epNum={epNum}
        runtime={runtime}
        trasnWatchTime={trasnWatchTime}
        saveMovies={saveMovies}
        like={like}
      />
    </>
  );
};
