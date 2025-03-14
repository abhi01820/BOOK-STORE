import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Signup = () => {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate=useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Values.username === "" ||
        Values.email === "" ||
        Values.password === "" ||
        Values.address === ""
      ) {
        alert("All Fields are required ");
      } else {
        const response=await axios.post(
          "http://localhost:1000/api/v1/signUp",
          Values
        );
        alert(response.data.message);
        navigate("/LogIn");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-white">
        <h2 className="text-3xl font-semibold text-center mb-6">Sign Up</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            className="w-full p-3 mb-3 rounded bg-gray-700 focus:outline-none"
            required
            value={Values.username}
            onChange={change}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 mb-3 rounded bg-gray-700 focus:outline-none"
            required
            value={Values.email}
            onChange={change}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full p-3 mb-3 rounded bg-gray-700 focus:outline-none"
            required
            value={Values.address}
            onChange={change}
          />
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 mb-3 rounded bg-gray-700 focus:outline-none"
              required
              value={Values.password} 
              onChange={change}
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 rounded hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
