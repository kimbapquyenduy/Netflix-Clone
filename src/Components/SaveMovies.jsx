import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { UserAuth } from "../Context/AuthContext";
import { db } from "../Firebase";
import { Movies } from "./Movies";

export const SaveMovies = () => {
  const [favMovies, setFavMovies] = useState([]);
  const { user } = UserAuth();
  const slider = useRef();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setFavMovies(doc.data()?.saveMovies);
    });
  }, [user?.email]);

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">My Show</h2>
      <div className=" flex items-center group relative w-full">
        <div ref={slider} className={`w-full h-full mx-2   `}>
          {favMovies?.map((item, id) => (
            <Movies item={item} key={id} index={id} tOS={item.tOS} />
          ))}
        </div>
      </div>
    </>
  );
};
