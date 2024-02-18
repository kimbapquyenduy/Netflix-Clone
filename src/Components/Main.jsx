import React, { useEffect } from "react";
import { useState } from "react";
import requests from "../Requests.js";
import axios from "axios";
import { FaPlay } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
import { Popup } from "./Popup.jsx";
import { UserAuth } from "../Context/AuthContext";
import { db } from "../Firebase";
import { arrayUnion, updateDoc, doc, query } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
export const Main = ({ tOS, movie }) => {
  const { user } = UserAuth();
  const [like, setLike] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [genre, setGenre] = useState([]);
  const [runtime, setRuntime] = useState();
  const [epNum, setEpNum] = useState();
  console.log(movie);
  const trasnWatchTime = (totatlminute) => {
    var Hours = Math.floor(totatlminute / 60);
    var minutes = totatlminute % 60;
    return Hours + " hours " + minutes + " minutes";
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else return str;
  };
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
  useEffect(() => {
    if (movie) {
      axios
        .get(
          ` https://api.themoviedb.org/3/tv/${movie?.id}?api_key=7452c219263bf44f619c3120bc2b3e4d`
        )
        .then((response) => {
          setEpNum(response.data.number_of_episodes);
        });
    }
  }, [
    ` https://api.themoviedb.org/3/movie/${movie?.id}?api_key=7452c219263bf44f619c3120bc2b3e4d`,
  ]);

  useEffect(() => {
    axios.get(requests.requestGenre).then((response) => {
      setGenre(response.data.genres);
    });
  }, [requests.requestGenre]);
  return (
    <>
      <div className="w-full h-[550px] text-white">
        <div className="w-full h-full ">
          <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            alt={movie?.name}
          />
          <div className="absolute w-full left-0 top-[25%] p-4 md:p-8 mb-4">
            <h1 className="text-3xl md:text-5xl font-bold">{movie?.name}</h1>
            <p className="text-gray-400 text-lg my-3">
              Release:{" "}
              {movie?.release_date
                ? movie?.release_date
                : movie?.first_air_date}
            </p>
            <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[40%] text-lg">
              {truncateString(movie?.overview, 150)}
            </p>
            <div className="my-4 flex">
              <Link to={`/watch/${tOS}/${movie?.id}`}>
                <div className="flex items-center align-middle justify-center bg-white rounded w-[120px] h-[45px] hover:bg-white/70 z-50 transition duration-200 cursor-pointer">
                  <FaPlay size={25} className="text-sm  text-black" />
                  <p className=" font-semibold text-lg cursor-pointer text-black ml-2">
                    Play
                  </p>
                </div>
              </Link>
              <div
                onClick={() => setIsOpen(true)}
                className=" group/button border border-gray-300 flex items-center align-middle ml-2 justify-center bg-[#535353] rounded w-[180px] h-[45px] hover:bg-[#6e6e6e] z-50 transition duration-200 cursor-pointer"
              >
                <IoIosInformationCircle
                  size={25}
                  className="text-sm  text-[#535353] bg-white rounded-full  group-hover/button:text-[#6e6e6e]"
                />
                <p className=" text-lg cursor-pointer text-white ml-2 font-medium">
                  More Info
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popup
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        item={movie}
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
