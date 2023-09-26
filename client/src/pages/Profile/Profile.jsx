import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Profile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [isEmailFocused, setIsEmailFocused] = useState(true);
  const [isEmailFilled, setIsEmailFilled] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(true);
  const [isPasswordFilled, setIsPasswordFilled] = useState(false);
  const [isNameFocused, setIsNameFocused] = useState(true);
  const [isNameFilled, setIsNameFilled] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/");
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
    if (!isValidEmail(event.target.value)) {
      setError("Email is invalid");
    } else {
      setError(null);
    }
    setEmail(e.target.value);
    handleRegisration();
  };
  const handlePasswordChange = (e) => {
    if (e.target.value !== "") {
      setIsPasswordFilled(true);
    } else {
      setIsPasswordFilled(false);
    }
    setPassword(e.target.value);
    handleRegisration();
  };
  const handleNameChange = (e) => {
    if (e.target.value !== "") {
      setIsNameFilled(true);
    } else {
      setIsNameFilled(false);
    }
    setName(e.target.value);
    handleRegisration();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //set configuration
    const configuration = {
      method: "post",
      url: "http://localhost:3000/register",
      data: {
        name,
        email,
        password,
      },
    };
    axios(configuration)
      .then(() => {
        setMessage("Registration Successful");
      })
      .catch((error) => {
        setMessage("Registration Failed Duplicate Email");
        console.log(error);
      });
  };

  const handleRegisration = () => {
    if (isValidEmail(email) && password.length >= 1 && name.length >= 1) {
      setCanSubmit(() => true);
    } else {
      setCanSubmit(() => false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#4070f4]">
      <div className="w-4/5 h-2/3 sm:w-1/4 sm:h-1/2  rounded-md  bg-slate-100  border-2 min-h-0 ">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1 className="text-3xl p-4 font-poppins font-bold">
            Update profile
          </h1>
          <div className="flex flex-col ml-6 relative ">
            <div className="relative box-border w-full h-full mb-2.5">
              {isNameFocused && !isNameFilled && (
                <i>
                  <FontAwesomeIcon
                    icon={faUser}
                    size="lg"
                    className="absolute p-2 mt-3 text-gray-400"
                  />
                </i>
              )}
              <input
                type="text"
                value={name}
                placeholder={"Enter Full Name"}
                className={`w-3/4
                placeholder:pl-[35px] 
                placeholder:focus:invisible 
                mt-4 pb-4 mb-4 
                border-b-2 border-solid border-[#ccc] 
                bg-transparent 
                focus:outline-none`}
                onChange={handleNameChange}
                onFocus={() => {
                  setIsNameFocused(false);
                }}
                onBlur={() => setIsNameFocused(true)}
                required={true}
              />
            </div>

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
                type="password"
                placeholder={"Enter Password"}
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
            </div>
          </div>
          <div className="flex justify-center flex-col">
            {message && <div className="flex justify-center ">{message}</div>}
            <div className="flex justify-center">
              <button
                className={
                  canSubmit
                    ? " bg-[#4070f4] w-2/5 h-2/3 text-xl p-2 mt-6  rounded-md text-white"
                    : "bg-[#4070f4]/50 w-2/5 h-2/3 text-xl p-2 mt-6  rounded-md text-white "
                }
                onClick={(e) => handleSubmit(e)}
                disabled={!canSubmit}
              >
                {" "}
                Register
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <h4>
              Already have an acount?
              <span
                className="text-[#4070f4] cursor-pointer"
                onClick={navigateLogin}
              >
                Login
              </span>
            </h4>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
