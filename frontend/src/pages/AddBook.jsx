import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    if (Object.values(Data).some((field) => field.trim() === "")) {
      alert("All fields are required!");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:1000/api/v1/add-book", Data, { headers });
      setData({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };
  

  return (
    <div className="bg-[#121212] min-h-screen flex justify-center items-center p-6">
      <div className="w-full max-w-md p-5 bg-[#1E1E1E] rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-[#E0E0E0] mb-4 text-center">
          Add Book 📚
        </h1>

        <div className="grid gap-3">
          <InputField
            label="Image URL"
            name="url"
            value={Data.url}
            onChange={change}
          />
          <InputField
            label="Title"
            name="title"
            value={Data.title}
            onChange={change}
          />
          <InputField
            label="Author"
            name="author"
            value={Data.author}
            onChange={change}
          />

          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Language"
              name="language"
              value={Data.language}
              onChange={change}
            />
            <InputField
              label="Price"
              name="price"
              value={Data.price}
              onChange={change}
            />
          </div>

          <div>
            <label className="text-[#B0B0B0] block text-sm">Description</label>
            <textarea
              name="desc"
              className="w-full p-2 rounded bg-[#252525] text-white text-sm outline-none focus:ring-2 focus:ring-[#FF6F61]"
              rows="3"
              placeholder="Book description..."
              value={Data.desc}
              onChange={change}
            ></textarea>
          </div>

          <button
            className="mt-4 w-full py-2 text-sm font-semibold text-white rounded bg-[#FF6F61] hover:bg-[#FF3D00] transition"
            onClick={submit}
          >
            Add Book 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange }) => (
  <div>
    <label className="text-[#B0B0B0] block text-sm">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 rounded bg-[#252525] text-white text-sm outline-none focus:ring-2 focus:ring-[#FF6F61]"
      placeholder={label}
      required
    />
  </div>
);

export default AddBook;
