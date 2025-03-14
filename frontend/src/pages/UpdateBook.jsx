import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const [loading, setLoading] = useState(false);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        toast.error("Error fetching book details");
      }
    };
    fetchBook();
  }, [id]);

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    if (Object.values(Data).some((field) => String(field).trim() === "")) {
      toast.warn("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      await axios.put(`http://localhost:1000/api/v1/update-book/${id}`, Data, {
        headers,
      });
      toast.success("Book updated successfully!");

      setTimeout(() => {
        navigate(`/view-book-details/${id}`, { replace: true });
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1A1A1A] px-4">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="w-full max-w-2xl bg-[#222] bg-opacity-80 shadow-xl rounded-2xl p-6 backdrop-blur-md">
        <h2 className="text-2xl font-bold text-white text-center mb-5">
          Update Book Details 📖
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-gray-400 block text-sm mb-1">Image URL</label>
            <input
              type="text"
              name="url"
              value={Data.url}
              onChange={change}
              className="w-full p-3 rounded-lg bg-[#2E2E2E] text-white text-sm outline-none focus:ring-2 focus:ring-[#FF6F61] transition"
              placeholder="Enter image URL"
            />
          </div>

          <div>
            <label className="text-gray-400 block text-sm mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={Data.title}
              onChange={change}
              className="w-full p-3 rounded-lg bg-[#2E2E2E] text-white text-sm outline-none focus:ring-2 focus:ring-[#FF6F61] transition"
              placeholder="Enter book title"
            />
          </div>

          <div>
            <label className="text-gray-400 block text-sm mb-1">Author</label>
            <input
              type="text"
              name="author"
              value={Data.author}
              onChange={change}
              className="w-full p-3 rounded-lg bg-[#2E2E2E] text-white text-sm outline-none focus:ring-2 focus:ring-[#FF6F61] transition"
              placeholder="Enter author name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 block text-sm mb-1">Language</label>
              <input
                type="text"
                name="language"
                value={Data.language}
                onChange={change}
                className="w-full p-3 rounded-lg bg-[#2E2E2E] text-white text-sm outline-none focus:ring-2 focus:ring-[#FF6F61] transition"
                placeholder="Enter language"
              />
            </div>

            <div>
              <label className="text-gray-400 block text-sm mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={Data.price}
                onChange={change}
                className="w-full p-3 rounded-lg bg-[#2E2E2E] text-white text-sm outline-none focus:ring-2 focus:ring-[#FF6F61] transition"
                placeholder="Enter price"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-400 block text-sm mb-1">Description</label>
            <textarea
              name="desc"
              className="w-full p-3 rounded-lg bg-[#2E2E2E] text-white text-sm outline-none focus:ring-2 focus:ring-[#FF6F61] transition"
              rows="3"
              placeholder="Book description..."
              value={Data.desc}
              onChange={change}
            ></textarea>
          </div>


          <button
            className={`mt-4 w-full py-3 text-sm font-semibold text-white rounded-lg ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#FF6F61] hover:bg-[#FF3D00] transition-all shadow-md hover:shadow-lg"
            }`}
            onClick={submit}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update ✅"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
