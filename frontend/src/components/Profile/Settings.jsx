import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

const Settings = () => {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...value, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-info",
          { headers }
        );
        setProfileData(response.data);
        setValue({ address: response.data.message || "" });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const submitAddress = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/update-address",
      value,
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-6">
      {!profileData ? (
        <Loader />
      ) : (
        <div className="w-full max-w-3xl bg-gray-800 shadow-lg rounded-2xl p-6 md:p-10">
          <h1 className="text-4xl font-bold text-gray-300 mb-6 text-center">
            Settings
          </h1>
          <div className="space-y-6">
            <div>
              <label className="text-gray-400 block text-sm font-medium">
                Username
              </label>
              <p className="p-3 bg-gray-700 text-gray-200 rounded-lg font-semibold mt-2">
                {profileData.username}
              </p>
            </div>

            <div>
              <label className="text-gray-400 block text-sm font-medium">
                Email
              </label>
              <p className="p-3 bg-gray-700 text-gray-200 rounded-lg font-semibold mt-2">
                {profileData.email}
              </p>
            </div>

            <div>
              <label className="text-gray-400 block text-sm font-medium">
                Address
              </label>
              <textarea
                name="address"
                value={value.address}
                onChange={change}
                placeholder="Enter your address..."
                className="w-full p-3 bg-gray-700 text-gray-200 rounded-lg border border-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 outline-none mt-2"
                rows="4"
              />
            </div>

            <div className="flex justify-end">
              <button
                className="bg-yellow-500 text-gray-900 font-semibold px-5 py-2 rounded-lg hover:bg-yellow-400 transition duration-300 shadow-lg"
                onClick={submitAddress}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
