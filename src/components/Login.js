import Header from "./Header";
import { BACKGROUND_IMG } from "../utils/constants";
import { useState } from "react";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const handleFormClick = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img alt="back-img" src={BACKGROUND_IMG} />
      </div>
      <form className="absolute p-12 w-3/12 my-36 mx-auto right-0 left-0 bg-black bg-opacity-60 text-white rounded-lg">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign !n" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-2 my-4 w-full bg-slate-800 rounded-md"
          />
        )}
        <input
          type="text"
          placeholder="Email or Phone Number"
          className="p-2 my-4 w-full bg-slate-800 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 my-4 w-full bg-slate-800 rounded-md"
        />
        <button className="text-center p-2 my-4 bg-red-600 w-full rounded-md">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p onClick={handleFormClick} className="font-bold cursor-pointer">
          {isSignInForm
            ? "New to Netflix ? Sign Up Now"
            : "Already Member? Sign !n"}
        </p>
      </form>
    </div>
  );
};

export default Login;
