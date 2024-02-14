import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { UserAuth } from "../Context/AuthContext";
import { db } from "../Firebase";
import { arrayUnion, updateDoc, doc } from "firebase/firestore";
import { Popup } from "./Popup";
export const Movies = ({ item }) => {
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
    <>
      <div
        className={`group/item w-[160px] sm:w-[200px] inline-block cursor-pointer p-2 `}
        onClick={() => setIsOpen(true)}
      >
        <div className="bg-black group-hover/item:absolute group-hover/item:left-[50%]  group-hover/item:top-[50%]  group-hover/item:w-[300px] group-hover/item:h-[275px] hover:shadow hover:shadow-white z-[999]">
          <div className="  ">
            <img
              className={`w-full h-full block object-cover group-hover/item:h-[50%]  `}
              src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
              alt={item?.title ? item?.title : item.name}
            />
            <div className="hidden group-hover/item:block text-white">
              <p className=" whitespace-normal text-xs md:text-sm font-bold">
                {item?.title ? item?.title : item.name}
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

      <Popup setIsOpen={setIsOpen} isOpen={isOpen} item={item} />
    </>
  );
};
