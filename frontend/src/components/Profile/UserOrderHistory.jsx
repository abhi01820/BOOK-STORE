import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-order-history",
          { headers }
        );
        setOrderHistory(response.data.data || []);
        
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <>
      {loading && (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      )}

      {!loading && orderHistory.length === 0 && (
        <div className="p-4 h-[80vh] text-zinc-100 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            No Order History
          </h1>
          <img
            src="https://cdn-icons-png.flaticon.com//128/9961/9961218.png"
            alt="No orders"
            className="h-[20vh] mb-8"
          />
        </div>
      )}

      {!loading && orderHistory.length > 0 && (
        <div className="h-full p-4 text-zinc-100 overflow-x-auto">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>

          {/* Table Header */}
          <div className="mt-4 bg-zinc-800 w-full min-w-[900px] rounded py-2 px-4 flex gap-2">
            <div className="w-[5%] text-center">
              <h1>Sr.</h1>
            </div>
            <div className="w-[25%]">
              <h1>Books</h1>
            </div>
            <div className="w-[40%]">
              <h1>Description</h1>
            </div>
            <div className="w-[10%]">
              <h1>Price</h1>
            </div>
            <div className="w-[15%]">
              <h1>Status</h1>
            </div>
            <div className="hidden md:block w-[5%]">
              <h1>Mode</h1>
            </div>
          </div>

          {/* Table Content */}
          {orderHistory.map((items, i) => (
            <div
              key={items?._id || i}
              className="bg-zinc-800 w-full min-w-[900px] rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer"
            >
              <div className="w-[5%] text-center">
                <h1>{i + 1}</h1>
              </div>
              <div className="w-[25%]">
                {items?.book ? (
                  <Link
                    to={`/view-book-details/${items.book._id}`}
                    className="hover:text-blue-300"
                  >
                    {items.book.title}
                  </Link>
                ) : (
                  <span className="text-red-500">Book Not Found</span>
                )}
              </div>
              <div className="w-[40%]">
                <h1>{items?.book?.desc?.slice(0, 50) || "No Description"}...</h1>
              </div>
              <div className="w-[10%]">
                <h1>₹ {items?.book?.price || "--"}</h1>
              </div>
              <div className="w-[15%] font-semibold">
                {items.status === "Order Placed" ? (
                  <div className="text-green-500">{items.status}</div>
                ) : items.status === "Cancelled" ? (
                  <div className="text-red-500">{items.status}</div>
                ) : (
                  items.status
                )}
              </div>
              <div className="hidden md:block w-[5%] text-zinc-400">
                <h1 className="text-sm">COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;
