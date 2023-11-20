import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../config";
import axios from "axios";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  // console.log("Hello Its Login Page ")

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email,password);

  const handleLogin = async (e) => {
    e.preventDefault();

    const objToSend = {
      email,
      password,
    };

    try {
      const response = await axios.post(`${BASE_URL}/Login`, objToSend);
      if (response.data.status) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // console.log(response.data.data.isType);

        if (response.data.isVerify) {
          localStorage.setItem("usertoken", response.data.token);
          if(response.data.data.isType === "user"){
            console.log(response.data.data.isType);
          navigate("/");
          }else if(response.data.data.isType === "vendor"){
            console.log(response.data.data.isType);
            navigate("/vendor")
          }
          
        } else {
          navigate("/OTPCode", {
            state: { email },
          });
        }
      }
    } catch (error) {
      console.log("error", error.message);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="parentDiv">
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/signup">{"Don't Have An Account? "}</Link>

          <button type="submit">LOGIN</button>
        </div>
      </form>
    </>
  );
};

export default Login;
