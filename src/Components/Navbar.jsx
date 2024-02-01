import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
export const Navbar = () => {
  const { user, logOut } = UserAuth();
  const nagivate = useNavigate();
  const HandleLogOut = async () => {
    try {
      await logOut();
      nagivate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between p-8 z-[100] absolute w-full ">
      <Link to={"/"}>
        <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
          Netflix
        </h1>
      </Link>
      {user?.email ? (
        <div>
          <Link to={"/account"}>
            <button className="text-white pr-4">Account</button>
          </Link>

          <button
            onClick={HandleLogOut}
            className="bg-red-600 px-6 py-2 cursor-pointer text-white"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to={"/login"}>
            <button className="text-white pr-4">Sign In</button>
          </Link>
          <Link to={"/signup"}>
            <button className="bg-red-600 px-6 py-2 cursor-pointer text-white">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
