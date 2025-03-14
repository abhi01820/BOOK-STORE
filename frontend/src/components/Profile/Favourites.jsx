import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-favourite-books",
          { headers }
        );
        setFavouriteBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching favourite books:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <h1 className="text-4xl font-bold text-white p-6">Your Favourites</h1>

      <div className="flex-1 px-8 pb-6">
        {FavouriteBooks.length === 0 ? (
          <p className="text-gray-400 text-lg text-center">
            No favourite books added yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {FavouriteBooks.map((items, i) => (
              <BookCard
                key={i}
                data={items}
                Favourite={true}
                setFavouriteBooks={setFavouriteBooks} 
                FavouriteBooks={FavouriteBooks} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
