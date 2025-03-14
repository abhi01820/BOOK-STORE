import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Authentication Headers (Retrieve from localStorage)
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
useEffect(() => {
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:1000/api/v1/all-orders",
        { headers }
      );

      console.log("Orders Data:", response.data.data);  // Debugging

      // Ensure response is an array before setting state
      if (Array.isArray(response.data.data)) {
        setAllOrders(response.data.data);
      } else {
        setAllOrders([]);  // Set empty array if data is not valid
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, []);


  // Function to Update Order Status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/update-order/${orderId}`,
        { status: newStatus },
        { headers }
      );

      if (response.data.success) {
        setAllOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <>
      {/* Loader (Shows While Fetching Data) */}
      {loading && (
        <div className="h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}

      {/* Error Message */}
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}

      {/* Orders List */}
      {!loading && allOrders.length > 0 && (
        <div className="h-full p-4 text-zinc-100 overflow-x-auto">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Orders
          </h1>

          {/* Table Header */}
          <div className="mt-4 bg-zinc-800 w-full min-w-[900px] rounded py-2 px-4 flex gap-2">
            <div className="w-[5%] text-center font-bold">Sr.</div>
            <div className="w-[20%] font-bold">Books</div>
            <div className="w-[30%] font-bold">Description</div>
            <div className="w-[10%] font-bold">Price</div>
            <div className="w-[10%] font-bold">Status</div>
            <div className="w-[20%] font-bold">Actions</div>
          </div>

          {/* Table Data */}
          {allOrders.map((order, index) => (
            <div
              key={order._id}
              className="bg-zinc-700 w-full min-w-[900px] rounded py-2 px-4 flex gap-2 mt-2"
            >
              {/* Serial Number */}
              <div className="w-[5%] text-center">{index + 1}</div>

              {/* Book Titles */}
              <div className="w-[20%]">
                {Array.isArray(order.book)
                  ? order.book.map((b) => b.title).join(", ")
                  : order?.book?.title || "No Book"}
              </div>

              {/* Book Descriptions */}
              <div className="w-[30%]">
                {Array.isArray(order.book)
                  ? order.book.map((b) => b.desc).join(" | ")
                  : order.desc || "No Description"}
              </div>

              {/* Book Price */}
              <div className="w-[10%]">₹{order?.book?.price || "N/A"}</div>

              {/* Order Status */}
              <div
                className={`w-[10%] ${
                  order?.status === "Cancelled"
                    ? "text-red-400"
                    : order?.status === "Out for Delivery"
                    ? "text-yellow-400"
                    : order?.status === "Delivered"
                    ? "text-green-400"
                    : "text-blue-400"
                }`}
              >
                {order?.status || "Unknown"}
              </div>

              {/* Action Buttons */}
              <div className="w-[20%] flex gap-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => updateOrderStatus(order._id, "Out for Delivery")}
                >
                  Out for Delivery
                </button>
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => updateOrderStatus(order._id, "Delivered")}
                >
                  Delivered
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => updateOrderStatus(order._id, "Cancelled")}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Orders Found */}
      {!loading && allOrders.length === 0 && (
        <div className="text-center text-gray-400 mt-4">No orders found.</div>
      )}
    </>
  );
};

export default AllOrders;
