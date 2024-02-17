import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiFillYoutube, AiOutlineClose } from "react-icons/ai";
import { GiSpeaker } from "react-icons/gi";

import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import axios from "axios";
import { FaPlay, FaCirclePlus, FaCircleChevronDown } from "react-icons/fa6";
import { IoIosCheckmark } from "react-icons/io";
export const Popup = ({
  setIsOpen,
  isOpen,
  item,
  genre,
  tOS,
  epNum,
  runtime,
  trasnWatchTime,
  saveMovies,
  like,
}) => {
  const [urlTrailer, setUrlTrailer] = useState([]);
  console.log(item);
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      loop: 1,
      allowfullscreen: 1,
    },
  };
  console.log(tOS);
  if (tOS == "tv") {
    useEffect(() => {
      axios
        .get(
          ` https://api.themoviedb.org/3/tv/${item?.id}/videos?api_key=7452c219263bf44f619c3120bc2b3e4d`
        )
        .then((response) => {
          const arrdata = response.data.results;

          arrdata.map((item) => {
            if (item.type == "Trailer") {
              setUrlTrailer(item.key);
            }
          });
        })
        .catch((err) => {
          console.error(err.response.data);
        });
    }, [
      ` https://api.themoviedb.org/3/tv/${item?.id}/videos?api_key=7452c219263bf44f619c3120bc2b3e4d`,
    ]);
  } else if ((tOS = "movie")) {
    useEffect(() => {
      axios
        .get(
          ` https://api.themoviedb.org/3/movie/${item?.id}/videos?api_key=7452c219263bf44f619c3120bc2b3e4d`
        )
        .then((response) => {
          const arrdata = response.data.results;

          arrdata.map((item) => {
            if (item.type == "Trailer") {
              setUrlTrailer(item.key);
            }
          });
        })
        .catch((err) => {
          console.error(err.response.data);
        });
    }, [
      ` https://api.themoviedb.org/3/movie/${item?.id}/videos?api_key=7452c219263bf44f619c3120bc2b3e4d`,
    ]);
  }

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else return str;
  };

  return (
    <>
      {isOpen ? (
        <div className="fixed w-[100%] h-[100vh] bg-black/90 justify-center items-center top-0 left-0 flex z-[999999] font-sans ">
          <div className=" w-[950px] h-[97vh] bg-[#181818] rounded-lg">
            <div className="w-full h-[75%] bg-white relative rounded-lg ">
              <div className="absolute bottom-0 w-full h-[10%] bg-gradient-to-t from-[#181818] z-10"></div>
              <div className="absolute top-0 w-full h-[35%] bg-gradient-to-b from-[#000000] z-10"></div>
              <div className="absolute bottom-0 w-full h-full z-10"></div>
              <div
                className="absolute top-4 right-2 text-xl rounded-full bg-black/80 text-white p-1 cursor-pointer z-[99999]"
                onClick={() => setIsOpen(false)}
              >
                <AiOutlineClose />
              </div>

              <YouTube
                videoId={urlTrailer}
                opts={opts}
                className="absolute top-0 bottom-0 left-0 h-full w-full z-0"
              />
              <p className="text-5xl text-white font-bold break-words whitespace-pre-wrap absolute left-10 bottom-40 font-serif">
                {item?.title ? item?.title : item.name}
              </p>
              <div className="flex w-full m-3 absolute left-8 bottom-20">
                <div className="flex items-center align-middle justify-center bg-white rounded w-[140px] h-[40px] hover:bg-white/70 z-50 transition duration-200 cursor-pointer">
                  <FaPlay size={25} className="text-sm  " />
                  <p className=" font-semibold text-lg cursor-pointer text-black ml-2">
                    Play
                  </p>
                </div>

                {like ? (
                  <IoIosCheckmark
                    className="text-white rounded-full bg-[#1b1b1b] p-0 ml-3 cursor-pointer border-2 border-[#a4a4a4] hover:border-[#fff]  transition duration-200"
                    size={40}
                  />
                ) : (
                  <FaCirclePlus
                    onClick={saveMovies}
                    size={40}
                    className="bg-white rounded-full  text-[#1b1b1b] p-0 ml-3 z-50 cursor-pointer border-2 border-[#a4a4a4] hover:border-[#fff] hover:text-[#141414] transition duration-200"
                  />
                )}
                <GiSpeaker
                  size={40}
                  className="text-sm cursor-pointer absolute  right-20 bg-white/10 text-[#a4a4a4] p-0 ml-3 z-50  border-2 border-[#a4a4a4] hover:border-[#fff] hover:text-[#fff] transition duration-200 rounded-full"
                />
              </div>
            </div>
            <div className="flex align-middle justify-center">
              <div className="px-10 pb-2 flex-[65%] ">
                <div className="flex">
                  <p className=" text-[#a4a4a4] break-words whitespace-pre-wrap mt-3 text-lg font-bold ">
                    {tOS == "tv" ? epNum + " Episode" : trasnWatchTime(runtime)}
                  </p>
                  <p>{item?.created_by}</p>
                </div>

                <p className="w-full text-white break-words whitespace-pre-wrap mt-3 text-base font-medium font-sans ">
                  {truncateString(item?.overview, 300)}
                </p>
              </div>
              <div className="mt-6 flex-[35%] font-sans text-base">
                <p className="text-white  font-medium">
                  <span className="text-white/50 font-extralight">
                    {" "}
                    Release Date:
                  </span>{" "}
                  {item?.release_date
                    ? item?.release_date
                    : item?.first_air_date}
                </p>
                <p className="text-white mt-2 font-medium">
                  <span className="text-white/50 font-extralight"> Genre:</span>{" "}
                  {item?.genre_ids.map((genlist) =>
                    genre
                      .filter((obj) => {
                        return obj.id == genlist;
                      })
                      .map((obj, key) =>
                        obj.name == "" ? obj.name : obj.name + ", "
                      )
                  )}
                </p>
                <p className="text-white mt-2  font-medium">
                  <span className="text-white/50 font-extralight">
                    {" "}
                    Vote Average:
                  </span>{" "}
                  {Math.round(item.vote_average * 10) / 10}/10
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
