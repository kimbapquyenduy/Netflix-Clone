import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiFillYoutube, AiOutlineClose } from "react-icons/ai";
import requests from "../Requests";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
export const Popup = ({ setIsOpen, isOpen, item }) => {
  const [genre, setGenre] = useState([]);
  const [urlTrailer, setUrlTrailer] = useState([]);
  movieTrailer(null, { tmdbId: item?.id })
    .then((url) => {
      const urlParams = new URLSearchParams(new URL(url).search);
      setUrlTrailer(urlParams.get("v"));
    })
    .catch((error) => console.log(error));
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  useEffect(() => {
    axios.get(requests.requestGenre).then((response) => {
      setGenre(response.data.genres);
    });
  }, [requests.requestGenre]);
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else return str;
  };
  console.log(item);
  return (
    <>
      {isOpen ? (
        <div className="fixed w-[100%] h-[100vh] bg-black/80 justify-center items-center top-0 left-0 flex z-[999]">
          <div className=" w-[1000px] h-[95vh] bg-zinc-800 ">
            <div className="w-full h-[70%] bg-white relative">
              <div
                className="absolute top-2 right-2 text-xl rounded-full bg-black/80 text-white p-1 cursor-pointer z-[99999]"
                onClick={() => setIsOpen(false)}
              >
                <AiOutlineClose />
              </div>
              <div></div>
              <YouTube videoId={urlTrailer} opts={opts} className="h-full" />
            </div>
            <div className="flex align-middle justify-center">
              <div className="px-6 py-4 flex-[70%] ">
                <p className="text-3xl text-white font-bold ">
                  {item?.title ? item?.title : item.name}
                </p>

                <p className="w-full text-white break-words whitespace-pre-wrap mt-2  ">
                  {truncateString(item?.overview, 300)}
                </p>
              </div>
              <div className="mt-14 flex-[30%]">
                <p className="text-white">
                  Release Date:{" "}
                  {item?.release_date
                    ? item?.release_date
                    : item?.first_air_date}
                </p>
                <p className="text-white mt-1">
                  Genre:{" "}
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
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
