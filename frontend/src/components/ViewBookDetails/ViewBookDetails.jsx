import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FcLike } from "react-icons/fc";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) return <Loader />;
  if (!Data) return <p className="text-white text-center">Book not found.</p>;

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const handleFavourite = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-book-to-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };
  const handleCart = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-to-cart",
      {},
      { headers }
    );
    alert(response.data.message);
  };
  const deleteBook = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:1000/api/v1/delete-book/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(response.data.message);
      navigate("/all-books");
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book!");
    }
  };

  const handleUpdateBook = async (updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/update-book/${id}`, // ✅ Pass ID in URL
        updatedData, // ✅ Send updated data in body
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Include auth token
          },
        }
      );

      alert(response.data.message);
      navigate("/all-books"); // Redirect to books page after update
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Failed to update book!");
    }
  };

  return (
    <div className="px-10 py-10 bg-gray-900 flex flex-col md:flex-row gap-10">
      <div className="bg-gray-800 rounded-xl p-6 w-full md:w-2/5 flex flex-col items-center shadow-lg">
        <img
          src={Data.url}
          alt={Data.title}
          className="h-[65vh] object-cover rounded-xl"
        />
        {isLoggedIn === true && role === "user" && (
          <div className="flex gap-4 mt-6">
            <button
              className="bg-white p-3 rounded-full text-2xl shadow-md hover:bg-gray-300 transition cursor-pointer"
              onClick={handleFavourite}
            >
              <FcLike />
            </button>
            <button
              className="bg-white p-3 rounded-full text-2xl shadow-md hover:bg-gray-300 transition cursor-pointer "
              onClick={handleCart}
            >
              <RiShoppingCart2Fill />
            </button>
          </div>
        )}
        {isLoggedIn === true && role === "admin" && (
          <div className="flex gap-4 mt-6">
            <Link
              to={`/updateBook/${id}`}
              className="bg-white p-3 rounded-full text-2xl shadow-md hover:bg-gray-300 transition cursor-pointer"
            >
              <FaRegEdit />
            </Link>
            <button
              className="bg-white p-3 rounded-full text-2xl shadow-md hover:bg-gray-300 transition cursor-pointer"
              onClick={deleteBook}
            >
              <MdOutlineDeleteOutline />
            </button>
          </div>
        )}
      </div>

      <div className="p-6 w-full md:w-3/5 flex flex-col justify-center">
        <h1 className="text-5xl font-extrabold text-white">{Data.title}</h1>
        <p className="text-lg text-gray-400 mt-2">by {Data.author}</p>
        <p className="text-gray-300 mt-5 text-lg leading-relaxed">
          {Data.desc}
        </p>

        <div className="flex items-center gap-3 mt-6 text-gray-400 text-lg cursor-pointer">
          <GrLanguage size={22} />
          {Data.language}
        </div>

        <p className="mt-6 text-4xl text-white font-bold">₹ {Data.price}</p>
      </div>
    </div>
  );
};

export default ViewBookDetails;
