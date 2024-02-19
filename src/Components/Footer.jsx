import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="flex items-center  flex-col w-[70%] space-y-3">
        <div className="text-white flex w-full text-3xl space-x-4">
          <FaInstagram />
          <FaFacebookF />
          <FaTwitter />
          <FaYoutube />
        </div>
        <div className="flex w-full content-between space  ">
          <div className="text-xs text-[#848484] mr-3  w-full">
            <p className="my-4">Audio descripsion </p>
            <p className="my-4">Relation with contractor </p>
            <p className="my-4">Policy information</p>
          </div>
          <div className="text-xs text-[#848484] ml-3 w-full">
            <p className="my-4">Customer support </p>
            <p className="my-4">Job </p>
            <p className="my-4">Cookie preferences </p>
          </div>
          <div className="text-xs text-[#848484] ml-3 w-full">
            <p className="my-4">Gift card </p>
            <p className="my-4">Term of use </p>
            <p className="my-4">Business information</p>
          </div>
          <div className="text-xs text-[#848484] ml-3 w-full">
            <p className="my-4">Multimedia center </p>
            <p className="my-5">Privacy </p>
            <p className="my-4">Contact Us</p>
          </div>
        </div>
        <div className="text-xs w-full text-[#848484] pb-4">
          © 2024 kimbapquyenduy
        </div>
      </div>
    </>
  );
};

export default Footer;
