import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="flex items-center  flex-col w-[800px] space-y-3">
        <div className="text-white flex w-full text-3xl space-x-4">
          <FaInstagram />
          <FaFacebookF />
          <FaTwitter />
          <FaYoutube />
        </div>
        <div className="flex w-full  content-between space ">
          <div className="text-sm text-[#fff] mr-3 w-[200px] ">
            <p className="my-2">Important Infor </p>
            <p className="my-2">Important Infor</p>
            <p className="my-2">Important Infor</p>
          </div>
          <div className="text-sm text-[#fff] ml-3 w-[200px]">
            <p className="my-2">Important Infor </p>
            <p className="my-2">Important Infor</p>
            <p className="my-2">Important Infor</p>
          </div>
          <div className="text-sm text-[#fff] ml-3 w-[200px]">
            <p className="my-2">Important Infor </p>
            <p className="my-2">Important Infor</p>
            <p className="my-2">Important Infor</p>
          </div>
          <div className="text-sm text-[#fff] ml-3 w-[200px]">
            <p className="my-2">Important Infor </p>
            <p className="my-2">Important Infor</p>
            <p className="my-2">Important Infor</p>
          </div>
        </div>
        <div className="w-full text-white">©2024 duylq</div>
      </div>
    </>
  );
};

export default Footer;
