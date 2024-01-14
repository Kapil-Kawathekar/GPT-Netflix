import Header from "./Header";
import { BACKGROUND_IMG } from "../utils/constants";
import { useState, useRef } from "react";
import { CheckValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const handleClickSubmit = () => {
    const message = CheckValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      // its a sign up form
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
              // ...
            });
          setErrorMessage(null);
          setIsSignInForm(!isSignInForm);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode == "auth/email-already-in-use") {
            setErrorMessage("Email already in use");
          }
        });
    } else {
      // Sign In form :

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          setErrorMessage(null);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode == "auth/invalid-credential") {
            setErrorMessage("Invalid Credentials");
          }
        });
    }
  };

  const handleToggleForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img alt="back-img" src={BACKGROUND_IMG} />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-12 w-3/12 my-36 mx-auto right-0 left-0 bg-black bg-opacity-60 text-white rounded-lg"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign !n" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2 my-4 w-full bg-slate-800 rounded-md"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email or Phone Number"
          className="p-2 my-4 w-full bg-slate-800 rounded-md"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-4 w-full bg-slate-800 rounded-md"
        />
        <p className="text-red-500 py-2 font-bold text-lg">{errorMessage}</p>
        <button
          onClick={handleClickSubmit}
          className="text-center p-2 my-4 bg-red-600 w-full rounded-md"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p onClick={handleToggleForm} className="font-bold cursor-pointer">
          {isSignInForm
            ? "New to Netflix ? Sign Up Now"
            : "Already Member? Sign !n"}
        </p>
      </form>
    </div>
  );
};

export default Login;
