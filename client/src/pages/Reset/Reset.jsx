import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const Reset = () => {
  const [password, setPassword] = useState("");

  const [isPasswordFocused, setisPasswordFocused] = useState(true);
  const [isPasswordFilled, setIsPasswordFilled] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [canSubmit, setCanSubmit] = useState(false);

  const navigate = useNavigate();
  const { id, token } = useParams();

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
      url: `http://localhost:3000/reset-password/${id}/${token}`,
      data: {
        password,
      },
    };
    axios(configuration)
      .then((res) => {
        if (res.status === 200) {
          navigate("/");
          res.send("Password Reset Successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = () => {
    if (password !== "") {
      setCanSubmit(() => true);
    } else {
      setCanSubmit(() => false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#4070f4]">
      <div className="w-4/5 h-1/3 sm:w-1/4 sm:h-1/3  rounded-md  bg-slate-100  border-2 min-h-[300px] ">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1 className="text-3xl p-4 font-poppins font-bold">
            Reset Password
          </h1>
          <div className="flex flex-col ml-6 relative ">
            <div className="relative box-border w-full h-full mb-2.5">
              {isPasswordFocused && !isPasswordFilled && (
                <i>
                  <FontAwesomeIcon
                    icon={faLock}
                    size="lg"
                    className="absolute p-2 mt-3 text-gray-400 "
                  />
                </i>
              )}
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                value={password}
                placeholder={"Enter New Password"}
                className={`w-3/4
                  placeholder:pl-[35px] 
                  placeholder:focus:invisible 
                  mt-4 pb-4 mb-4 
                  border-b-2 border-solid border-[#ccc]
                  bg-transparent 
                  focus:outline-none`}
                onChange={handlePasswordChange}
                onFocus={() => {
                  setisPasswordFocused(false);
                }}
                onBlur={() => setisPasswordFocused(true)}
                required={true}
              />
              <FontAwesomeIcon
                icon={faEye}
                className=" mr-4 text-gray-400"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              ></FontAwesomeIcon>
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

export default Reset;
