import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from './../store/auth';
import {useDispatch} from "react-redux";


const Login = () => {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    event.preventDefault();
    try {
      if (
        Values.username === "" ||
        Values.password === "" 
      ) {
        alert("All Fields are required ");
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/signIn",
          Values
        );
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id",response.data.id);
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("role",response.data.role);
        navigate("/profile");
        
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl text-white font-bold text-center mb-6">
          Login
        </h2>
        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="w-full p-2 rounded bg-gray-700 text-white mb-4"
            required
            value={Values.username}
            onChange={change}
          />
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={Values.password}
            onChange={change}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400"
            >
              👁‍🗨
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded mt-4 cursor-pointer "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
