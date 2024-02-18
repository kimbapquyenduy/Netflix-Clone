import React from "react";
import { Link, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import axios from "axios";
import { FaPlay, FaCirclePlus, FaCircleChevronDown } from "react-icons/fa6";
import { IoIosCheckmark } from "react-icons/io";
import { useState } from "react";
import { AiFillYoutube, AiOutlineClose } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import { useEffect } from "react";

export const Watch = () => {
  const [urlTrailer, setUrlTrailer] = useState(["asd"]);
  let params = useParams();

  console.log(urlTrailer);

  if (params.tOS == "tv") {
    useEffect(() => {
      axios
        .get(
          ` https://api.themoviedb.org/3/tv/${params.id}/videos?api_key=7452c219263bf44f619c3120bc2b3e4d`
        )
        .then((response) => {
          const arrdata = response.data.results;
          arrdata.map((item) => {
            if (item.type == "Trailer") {
              setUrlTrailer((pre) => (pre = item.key));
            }
          });
        })
        .catch((err) => {
          console.error(err.response.data);
        });
    }, [
      ` https://api.themoviedb.org/3/tv/${params.id}/videos?api_key=7452c219263bf44f619c3120bc2b3e4d`,
    ]);
  } else if (params.tOS == "movie") {
    useEffect(() => {
      axios
        .get(
          ` https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=7452c219263bf44f619c3120bc2b3e4d`
        )
        .then((response) => {
          const arrdata = response.data.results;

          arrdata.map((item) => {
            if (item.type == "Trailer") {
              setUrlTrailer((pre) => (pre = item.key));
            }
          });
        })
        .catch((err) => {
          console.error(err.response.data);
        });
    }, [
      ` https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=7452c219263bf44f619c3120bc2b3e4d`,
    ]);
  }
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      loop: 1,
      allowfullscreen: 1,
    },
  };

  return (
    <div className=" bg-white block rounded-lg  ">
      {/* <div className="absolute bottom-0 w-full h-[10%] bg-gradient-to-t from-[#181818] z-10"></div>
      <div className="absolute top-0 w-full h-[35%] bg-gradient-to-b from-[#000000] z-10"></div>
      <div className="absolute bottom-0 w-full h-full z-10"></div> */}
      <Link to={"/"}>
        <div className="absolute top-4 left-4 text-3xl rounded-full bg-black/80 text-white p-1 cursor-pointer z-[99999] border-2">
          <IoMdArrowBack />
        </div>
      </Link>

      <YouTube
        videoId={urlTrailer}
        opts={opts}
        className="absolute top-0 bottom-0 left-0 h-full w-full  z-[111]"
      />
      <p className="text-5xl text-white font-bold break-words whitespace-pre-wrap absolute left-10 bottom-40 font-serif max-w-2xl ">
        {/* {item?.title ? item?.title : item.name} */}
      </p>
    </div>
  );
};
