import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./../BookCard/BookCard";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const [Data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-recent-books"
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="mt-6 px-6">
      <h4 className="text-3xl font-bold text-white mb-4">
        Recently Added Books
      </h4>

      {!Data ? (
        <div className="flex items-center justify-center my-8">
          <Loader />{" "}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Data.map((item, i) => (
            <BookCard key={i} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyAdded;
