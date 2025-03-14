import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const Navbar = () => {
  let links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  if (isLoggedIn) {
    links.push({ title: "Cart", link: "/cart" });

    if (role === "admin") {
      links.push({ title: "Admin Profile", link: "/profile" });
    } else {
      links.push({ title: "Profile", link: "/profile" });
    }
  }

  const [MobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!document.getElementById("mobile-menu")?.contains(event.target)) {
        setMobileNav(false);
      }
    };
    if (MobileNav) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [MobileNav]);

  return (
    <>
      <nav className="relative bg-gradient-to-r from-indigo-800 via-purple-800 to-blue-700 text-white flex px-8 py-4 items-center justify-between z-50 shadow-lg">
        <Link to="/" className="flex items-center">
          <img
            className="h-12 me-4 drop-shadow-lg"
            src="https://th.bing.com/th/id/OIP.GotakICOT-exqFSJlRcbLgHaEh?rs=1&pid=ImgDetMain"
            alt="library-logo"
          />
          <h1 className="text-3xl font-bold tracking-wider hover:text-yellow-400 transition-all duration-300">
            Abhi-BookStore(Library)
          </h1>
        </Link>
        <div className="md:hidden">
          <button
            className="text-white text-3xl hover:scale-125 transition-transform duration-300"
            onClick={() => setMobileNav(true)}
          >
            <FaBars />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className={`hover:text-blue-500 transition-all duration-300 ${
                item.title === "Profile"
                  ? "hover:text-yellow-400 font-semibold"
                  : ""
              }`}
            >
              {item.title}
            </Link>
          ))}

          {!isLoggedIn && (
            <div className="flex gap-6">
              <Link
                to="/LogIn"
                className="px-6 py-2 border-2 border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-indigo-900 transition-all duration-300 hover:scale-105 text-lg font-semibold"
              >
                Login
              </Link>
              <Link
                to="/SignUp"
                className="px-6 py-2 bg-yellow-400 rounded-lg hover:bg-white hover:text-indigo-900 transition-all duration-300 hover:scale-105 text-lg font-semibold"
              >
                SignUp
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed top-0 left-0 h-screen w-full bg-black/80 backdrop-blur-xl transition-all duration-500 flex flex-col items-center justify-center z-50 ${
          MobileNav
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        }`}
      >
        <button
          className="absolute top-6 right-6 text-white text-4xl hover:scale-125 transition-transform duration-300"
          onClick={() => setMobileNav(false)}
        >
          <IoMdClose />
        </button>

        {links.map((item, i) => (
          <Link
            key={i}
            to={item.link}
            className="text-white text-4xl font-bold mb-8 transition-all duration-300 hover:text-yellow-400 hover:scale-110"
            onClick={() => setMobileNav(false)}
          >
            {item.title}
          </Link>
        ))}

        <Link
          to="/all-books"
          className="px-10 mb-8 text-3xl font-bold py-3 border-4 border-yellow-400 rounded-lg text-white transition-all duration-300 hover:bg-yellow-400 hover:text-indigo-900 hover:scale-110 "
          onClick={() => setMobileNav(false)}
        >
          Discover Books
        </Link>

        {!isLoggedIn && (
          <>
            <Link
              to="/LogIn"
              className="px-10 mb-8 text-3xl font-bold py-3 border-4 border-yellow-400 rounded-lg text-white transition-all duration-300 hover:bg-yellow-400 hover:text-indigo-900 hover:scale-110"
              onClick={() => setMobileNav(false)}
            >
              Login
            </Link>
            <Link
              to="/SignUp"
              className="px-10 mb-8 text-3xl font-bold py-3 bg-yellow-400 rounded-lg transition-all duration-300 hover:bg-white hover:text-indigo-900 hover:scale-110"
              onClick={() => setMobileNav(false)}
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
