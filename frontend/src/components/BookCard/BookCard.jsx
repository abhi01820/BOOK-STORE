import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ data, Favourite, setFavouriteBooks, FavouriteBooks }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/remove-book-from-favourite",
        {},
        { headers }
      );

      alert(response.data.message);

      
      setFavouriteBooks(FavouriteBooks.filter(book => book._id !== data._id));

    } catch (error) {
      console.error("Error removing book:", error);
      alert("Failed to remove the book. Try again!");
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center h-[230px]">
          <img src={data.url} alt={data.title} className="h-full object-cover" />
        </div>

        <div className="mt-3 text-center">
          <h2 className="text-lg font-bold text-white truncate">{data.title}</h2>
          <p className="text-sm text-gray-400 mt-1">by {data.author}</p>
          <p className="mt-2 text-yellow-400 font-semibold text-lg">
            ₹ {data.price}
          </p>
        </div>
      </Link>

      {Favourite && (
        <button
          className="mt-4 w-full px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-md 
                     hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          onClick={handleRemoveBook}
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default BookCard;
