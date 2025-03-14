import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaHistory,
  FaCog,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const role = useSelector((state) => state.auth.role); // FIX: Retrieve role from Redux

  if (!data) return null;

  return (
    <div className="relative">
      <button
        className="absolute top-4 left-4 z-50 text-white bg-blue-600 p-2 rounded-full md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-blue-500 to-purple-600 p-6 shadow-xl flex flex-col items-center justify-between transition-transform duration-300`}
      >
        <div className="w-full flex flex-col items-center">
          {data.avatar ? (
            <img
              src={data.avatar}
              className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
              alt="User Avatar"
            />
          ) : (
            <div className="h-24 w-24 flex items-center justify-center rounded-full bg-white text-blue-600 text-3xl font-bold shadow-lg">
              {data.username ? data.username[0].toUpperCase() : "?"}
            </div>
          )}

          <p className="mt-3 text-xl text-white font-semibold">
            {data.username}
          </p>
          <p className="text-sm text-gray-200">{data.email}</p>

          <div className="w-full mt-4 h-[1px] bg-gray-300 opacity-50"></div>

          <div className="w-full flex flex-col items-center mt-4">
            {role !== "admin" ? (
              <>
                <SidebarLink to="/profile" label="Profile" />
                <SidebarLink to="/profile/order-history" label="Order History" />
                <SidebarLink to="/profile/settings" label="Settings" />
              </>
            ) : (
              <>
                <SidebarLink to="/profile" icon={<FaHistory />} label="All Orders" />
                <SidebarLink to="/profile/add-book" icon={<FaCog />} label="Add Book" />
              </>
            )}
          </div>
        </div>

        <button
          className="w-full py-3 mt-6 bg-red-600 text-white font-semibold flex items-center justify-center rounded-md hover:bg-red-700 transition-all cursor-pointer"
          onClick={() => {
            dispatch(authActions.logout());
            dispatch(authActions.changeRole("user"));
            localStorage.removeItem("id");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            navigate("/");
          }}
        >
          <FaSignOutAlt className="mr-2" size={18} />
          Log Out
        </button>
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center w-full px-4 py-3 mt-2 text-white font-medium rounded-md hover:bg-white hover:text-blue-600 transition-all"
  >
    <span className="mr-3">{icon}</span> {label}
  </Link>
);

export default Sidebar;
