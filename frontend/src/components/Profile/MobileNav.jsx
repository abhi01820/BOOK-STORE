import React, { useState } from "react";
import { FaHeart, FaHistory, FaCog, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const MobileNav = ({ user, books }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-black text-white p-4 shadow-lg">
      {/* Navbar Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition w-full text-center justify-center"
      >
        {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        <span>Profile</span>
      </button>

      {/* Profile Section (Dropdown) */}
      {isOpen && (
        <div className="mt-4 bg-gray-900 p-5 rounded-lg shadow-md text-center">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            {user.avatar ? (
              <img
                src={user.avatar}
                className="h-20 w-20 rounded-full border-4 border-gray-500 shadow-md"
                alt="User Avatar"
              />
            ) : (
              <div className="h-20 w-20 flex items-center justify-center rounded-full bg-gray-300 text-gray-800 text-3xl font-bold">
                {user.username ? user.username[0].toUpperCase() : "?"}
              </div>
            )}
            <h2 className="mt-3 text-lg font-bold">{user.username}</h2>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>

          {/* Log Out Button */}
          <button className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-md flex items-center space-x-2 justify-center w-full hover:bg-gray-700 transition">
            <FaSignOutAlt size={18} />
            <span>Log Out</span>
          </button>

          {/* Navigation Tabs */}
          <div className="flex justify-around mt-4 border-b border-gray-700 pb-2">
            <Link to="/profile/favourites" className="text-gray-400 hover:text-white transition">
              <FaHeart size={18} />
              <p>Favourites</p>
            </Link>
            <Link to="/profile/orderHistory" className="text-gray-400 hover:text-white transition">
              <FaHistory size={18} />
              <p>Order History</p>
            </Link>
            <Link to="/profile/settings" className="text-gray-400 hover:text-white transition">
              <FaCog size={18} />
              <p>Settings</p>
            </Link>
          </div>

          {/* Favourite Books Section */}
          <div className="mt-4">
            {books.map((book, index) => (
              <div key={index} className="bg-gray-800 p-3 rounded-lg shadow-md mt-2">
                <img src={book.image} alt={book.title} className="w-full h-32 object-cover rounded-md" />
                <h3 className="mt-2 text-white text-sm font-semibold">{book.title}</h3>
                <p className="text-gray-400 text-xs">by {book.author}</p>
                <p className="text-yellow-400 text-sm mt-1">₹ {book.price}</p>
                <button className="mt-2 w-full bg-gray-700 text-gray-300 px-3 py-1 rounded-md hover:bg-red-600 hover:text-white transition">
                  Remove from Favourites
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
