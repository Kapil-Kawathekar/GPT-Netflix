import React, { useEffect } from "react";
import { LOGO_URL, PROFILE_LOGO } from "../utils/constants";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <div className="  w-full absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img alt="logo" className="w-44" src={LOGO_URL} />

      {user && (
        <div className="flex">
          <img className="w-12 h-12 mt-3" alt="userIcon" src={PROFILE_LOGO} />

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
