import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import BookCard from "../components/BookCard/BookCard";

const AllBooks = () => {
  const [Data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-all-books"
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 min-h-screen px-12 py-12">
      <h4 className="text-4xl font-extrabold text-white text-center tracking-wider">
        📚 All Books
      </h4>

      {!Data && (
        <div className="w-full h-[100%] flex items-center justify-center ">
          <Loader />
        </div>
      )}

      <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Data &&
          Data.map((items, i) => (
            <div
              key={i}
              className="bg-gray-700/30 backdrop-blur-md border border-gray-600 rounded-2xl p-5 shadow-md 
                         hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <BookCard data={items} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllBooks;
