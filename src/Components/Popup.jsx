import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import requests from "../Requests";

export const Popup = ({ setIsOpen, isOpen, item }) => {
  const [genre, setGenre] = useState([]);

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
          <div className=" w-[1000px] h-[95vh] bg-black ">
            <div className="w-full h-[65%] bg-white relative">
              <div
                className="absolute top-2 right-2 text-xl rounded-full bg-black/80 text-white p-1 cursor-pointer z-[99999]"
                onClick={() => setIsOpen(false)}
              >
                <AiOutlineClose />
              </div>
            </div>
            <div className="flex ">
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
                <p className="text-white mt-2">
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
