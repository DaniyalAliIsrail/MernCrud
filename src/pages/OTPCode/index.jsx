import * as React from "react";
import axios from "axios";
import BASE_URL from "../../config";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "./otp.css";

const OTPCode = () => {
  const navigate = useNavigate();
  const [otpCode, setOTPCode] = React.useState("");
  const { state } = useLocation();
  console.log(state);

  React.useEffect(() => {
    if (!state) {
      navigate("/signup");
    }
  }, []);

  const handleOTP = async (e) => {
    e.preventDefault();

    const objToSend = {
      email: state.email,
      otpCode: otpCode,
    };

    try {
      const response = await axios.post(`${BASE_URL}/Verification`, objToSend);

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
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.messsage, {
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
    <form onSubmit={handleOTP}>
      <div className="parentDiv">
        <h2>OTP Verification</h2>
        <input
          type="text"
          placeholder="Enter Your OTP"
          onChange={(e) => setOTPCode(e.target.value)}
        />
        <a href="/">Didn't Receive OTP?</a>
        <button type="submit">VERIFY</button>
      </div>
    </form>
  );
};

export default OTPCode;
