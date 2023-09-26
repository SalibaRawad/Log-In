import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";
const cookies = new Cookies();
import axios from "axios";

// import Email from "./Email"
// import Password from "./Password"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
  const [isEmailFocused, setIsEmailFocused] = useState(true);
  const [isEmailFilled, setIsEmailFilled] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(true);
  const [isPasswordFilled, setIsPasswordFilled] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const navigateRegister = () => {
    navigate("/register");
  };

  const navigateForgot = () => {
    navigate("/forgot-password");
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleEmailChange = (e) => {
    if (e.target.value !== "") {
      setIsEmailFilled(true);
    } else {
      setIsEmailFilled(false);
    }
    if (!isValidEmail(e.target.value)) {
      setError("Email is invalid");
    } else {
      setError(null);
    }
    setEmail(e.target.value);
    handleLogin();
  };

  const handlePasswordChange = (e) => {
    if (e.target.value !== "") {
      setIsPasswordFilled(true);
    } else {
      setIsPasswordFilled(false);
    }
    setPassword(e.target.value);
    handleLogin();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: "http://localhost:3000/login",
      data: {
        email,
        password,
      },
    };
    axios(configuration)
      .then((result) => {
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });
        window.location.href = "/main";
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        console.log(error);
      });
  };

  const handleLogin = () => {
    if (isValidEmail(email) && password.length >= 1) {
      setCanSubmit(() => true);
    } else {
      setCanSubmit(() => false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#4070f4]">
      <div className="w-4/5 h-2/3 sm:w-1/4 sm:h-1/2  rounded-md  bg-slate-100  border-2 min-h-[400px] ">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1 className="text-3xl p-4 font-poppins font-bold">Login</h1>
          <div className="flex flex-col ml-6 relative ">
            <div className="relative box-border w-full h-full mb-2.5">
              {isEmailFocused && !isEmailFilled && (
                <i>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    size="lg"
                    className="absolute p-2 mt-3 text-gray-400 "
                  />
                </i>
              )}
              <input
                type="email"
                name="email"
                value={email}
                placeholder={"Enter Email"}
                className={`w-3/4
                placeholder:pl-[35px] 
                placeholder:focus:invisible 
                mt-4 pb-4 mb-4 
                border-b-2 border-solid ${
                  !error ? "border-[#ccc]" : "border-red-500"
                } 
                bg-transparent 
                focus:outline-none`}
                onChange={handleEmailChange}
                onFocus={() => {
                  setIsEmailFocused(false);
                }}
                onBlur={() => setIsEmailFocused(true)}
                required={true}
              />
            </div>

            <div className="relative box-border w-full h-full mb-2.5">
              {isPasswordFocused && !isPasswordFilled && (
                <i>
                  <FontAwesomeIcon
                    icon={faLock}
                    size="lg"
                    className="absolute p-2 mt-3 text-gray-400"
                  />
                </i>
              )}
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder={"Enter Password"}
                name="password"
                value={password}
                className={`w-3/4
                placeholder:pl-[35px] 
                placeholder:focus:invisible 
                mt-4 pb-4 mb-4 
                border-b-2 border-solid border-[#ccc] 
                bg-transparent 
                focus:outline-none`}
                onChange={handlePasswordChange}
                onFocus={() => {
                  setIsPasswordFocused(false);
                }}
                onBlur={() => setIsPasswordFocused(true)}
                required={true}
              />
              <FontAwesomeIcon
                icon={faEye}
                className=" mr-4 text-gray-400"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              ></FontAwesomeIcon>
            </div>
            <a
              href=""
              className="flex justify-end mr-10 text-lg text-[#4070f4]"
              onClick={navigateForgot}
            >
              Forgot Password ?
            </a>
          </div>
          <div className="flex justify-center items-center relative flex-col">
            {errorMessage && (
              <div className="flex justify-center ">{errorMessage}</div>
            )}
            <button
              className={
                canSubmit
                  ? `bg-[#4070f4] w-3/4 h-2/3 text-xl p-2 mt-6  rounded-md text-white1`
                  : `bg-[#4070f4]/50 w-3/4 h-2/3 text-xl p-2 mt-6  rounded-md text-white1`
              }
              onSubmit={(e) => handleSubmit(e)}
              disabled={!canSubmit}
            >
              {" "}
              Log In
            </button>
          </div>
          <div className="flex justify-center mt-8">
            <h4>
              Already have an acount?
              <span
                href=""
                className="text-[#4070f4] cursor-pointer "
                onClick={navigateRegister}
              >
                Register
              </span>
            </h4>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
