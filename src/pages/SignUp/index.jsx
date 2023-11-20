import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../config";
import axios from "axios";
import "./signup.css";

const SignUp = () => {

  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectUser , setselectUser] = useState("")


  const typeHandler = (event) => {
    setselectUser(event.target.value);
  };
  console.log(selectUser);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const objToSend = {
      fullName,
      email,
      selectUser,
      password,
    };
    console.log(objToSend);
    try {
      const response = await axios.post(`${BASE_URL}/signUp`, objToSend);
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
        navigate("/OTPCode", {
          state: {
            email,
          },
        });
      } else {
        toast.error(response.data.message, {
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
    } catch (error) {
      console.error("Error during sign up:", error);
      toast.error("An error occurred during sign up", {
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
      <form onSubmit={handleSignUp}>
        <div className="parentDiv">
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Enter The Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <select value={selectUser} onChange={typeHandler}>
            <option value="" disabled>Select Type</option>
            <option value="user">user</option>
            <option value="vendor">vendor</option>
          </select>

          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/login">{"Already Have An Account? "}</Link>
          <button type="submit">signup</button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
