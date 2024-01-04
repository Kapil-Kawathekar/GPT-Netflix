import React from "react";
import { LOGO_URL } from "../utils/constants";

const Header = () => {
  return (
    <div className="  w-full absolute px-8 py-2 bg-gradient-to-b from-black z-10">
      <img alt="logo" className="w-44" src={LOGO_URL} />
    </div>
  );
};

export default Header;
