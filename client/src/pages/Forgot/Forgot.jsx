import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Forgot = () => {
  const [email, setEmail] = useState("");

  const [error, setError] = useState(null);
  const [isEmailFocused, setIsEmailFocused] = useState(true);
  const [isEmailFilled, setIsEmailFilled] = useState(false);

  const [canSubmit, setCanSubmit] = useState(false);

  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: "http://localhost:3000/forgot-password",
      data: {
        email,
      },
    };
    axios(configuration)
      .then((res) => {
        if (res.status === 200) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = () => {
    if (isValidEmail(email)) {
      setCanSubmit(() => true);
    } else {
      setCanSubmit(() => false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#4070f4]">
      <div className="w-4/5 h-2/3 sm:w-1/4 sm:h-1/3  rounded-md  bg-slate-100  border-2 min-h-[300px] ">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1 className="text-3xl p-4 font-poppins font-bold">
            Forgot Password
          </h1>
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
          </div>

          <div className="flex justify-center items-center relative">
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
