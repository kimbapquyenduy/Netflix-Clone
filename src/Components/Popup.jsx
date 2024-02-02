import React from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export const Popup = ({ Closesing, isOpen, item }) => {
  return (
    <>
      {isOpen ? (
        <div className="fixed w-[100%] h-[100vh] bg-black/80 justify-center items-center top-0 left-0 flex z-[9999]">
          <div className="relative w-[800px] h-[95vh] bg-black ">
            <div className="w-full h-[60%] bg-white"></div>
            <div className="flex">
              <div>
                <div className="text-3xl text-white font-bold">
                  {item?.title ? item?.title : item.name}
                </div>
              </div>
              <div>
                <div className="text-white">Cate</div>
              </div>
            </div>
            <div
              className="absolute top-2 right-2 text-xl rounded-full bg-black/80 text-white p-1 cursor-pointer"
              onClick={Closesing}
            >
              <AiOutlineClose />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
