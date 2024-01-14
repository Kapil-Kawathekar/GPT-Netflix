import React from "react";
import { LOGO_URL } from "../utils/constants";

import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <div className="  w-full absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img alt="logo" className="w-44" src={LOGO_URL} />

      {user && (
        <div className="flex">
          <img
            className="w-12 h-12 mt-3"
            alt="userIcon"
            src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
          />

          <button onClick={handleSignOut} className="font-bold text-white">
            {user && <p>{user.displayName}</p>}
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
