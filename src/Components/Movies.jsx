import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { UserAuth } from "../Context/AuthContext";
import { db } from "../Firebase";
import { arrayUnion, updateDoc, doc } from "firebase/firestore";
export const Movies = ({ item }) => {
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const { user } = UserAuth();

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

  return (
    <div className="w-[160px] sm:w-[200px] inline-block cursor-pointer relative p-2">
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title ? item?.title : item.name}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-[#1b1b1b]/70 opacity-0 hover:opacity-100 text-white">
        <p className=" whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center  ">
          {item?.title ? item?.title : item.name}
        </p>
        <p onClick={saveMovies}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-400" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
};
