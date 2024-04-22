import React from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useContext } from "react";
import { GlobalContext } from "../context/useGlobalContext";
import { useState, useEffect } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";

import { signOut } from "firebase/auth";
import { auth } from "../firebase/fireBaseConfig";

const themes = {
  dark: "dark",
  light: "light",
};

function Navbar() {
  const { dispatch, navbarBgColor, user } = useContext(GlobalContext);
  const [theme, setTheme] = useState(darkModeLocalstorage());

  const signOutFunc = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function darkModeLocalstorage() {
    return localStorage.getItem("mode") || themes.light;
  }

  const handleClick = () => {
    const newTheme = theme == themes.light ? themes.dark : themes.light;
    setTheme(newTheme);
    localStorage.setItem("mode", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="bg-base-300">
      <div className="navbar align-element">
        <div className="navbar-start">
          <Link to="/" className="btn btn-primary lg:btn-lg hidden lg:flex">
            Kitchen App
          </Link>
          <div tabIndex={0} role="button" className="dropdown  lg:hidden">
            <button className="btn btn-primary lg:btn-lg ">MK</button>
            <div
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 mt-3 rounded-box w-64"
            >
              <NavLinks />
            </div>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <NavLinks />
        </div>
        <div className="navbar-end">
          {user && <p className="mr-3"> {user.displayName}</p>}
          <div className="dropdown dropdown-end flex items-center">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle  avatar"
            >
              <div className="w-10  rounded-full">
                <img
                  alt={`${user.displayName ?? "user"}`}
                  src={user.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-10 mr-5 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button onClick={signOutFunc} className="btn btn-sm mb-2 mt-3 ">
                  Logout
                </button>
              </li>

              <li>
        <Link to="/create" className="btn btn-sm">Create recipie</Link>
               
              </li>
 

        
            </ul>


          </div>

          <div className="flex justify-end items-center ml-5">
          <label className="swap swap-rotate">
            <input
           
              onClick={handleClick}
              type="checkbox"
              defaultChecked={theme == "dark" ? false : true}
            />

            <IoSunnyOutline className="swap-off fill-current w-8 h-8" />

            <IoMoonOutline className="swap-on fill-current w-8 h-8" />
          </label>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
