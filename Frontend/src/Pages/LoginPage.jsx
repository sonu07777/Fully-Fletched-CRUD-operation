import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  FaApple,
  FaGoogle,
  FaFacebook,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Redux/Slice/AuthSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handelUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  async function onLogin(event) {
    event.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the details");
      return;
    }

    // dispatch create account action
    const response = await dispatch(login(loginData));
    if (response?.payload?.success) navigate("/");

    setLoginData({
      email: "",
      password: "",
    });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-xl overflow-hidden bg-white shadow-lg">
        {/* Left Section - Image (Hidden on extra-small screens) */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Background"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 bg-green-50 flex flex-col justify-center">
          <div className="text-center mb-6">
            <div className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-full mx-auto text-xl font-bold">
              T
            </div>
            <h2 className="text-2xl font-semibold mt-4">
              Welcome to Trendhunt
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Discover trends, gain insights, and make informed decisions
              effortlessly.
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-4" noValidate onSubmit={onLogin}>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handelUserInput}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={loginData.password}
                onChange={handelUserInput}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="text-right">
              <Link to="/forgetPassword" className="text-green-600 text-sm hover:underline">
                Forgot your password?
              </Link>
            </div>
            <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
              Log in
            </button>
          </form>

          <p className="text-gray-500 text-xs text-center mt-4">
            By continuing with Google, Apple, or Email, you agree to Trendhunt's
            <a href="#" className="text-green-600">
              {" "}
              Terms of Service{" "}
            </a>{" "}
            and
            <a href="#" className="text-green-600">
              {" "}
              Privacy Policy
            </a>
            .
          </p>

          {/* Social Login Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <button className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition">
              <FaApple size={20} />
            </button>
            <button className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition">
              <FaGoogle size={20} />
            </button>
            <button className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition">
              <FaFacebook size={20} />
            </button>
          </div>

          <p className="text-gray-500 text-sm text-center mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
