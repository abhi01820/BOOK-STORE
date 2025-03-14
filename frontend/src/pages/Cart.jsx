import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        "http://localhost:1000/api/v1/get-user-cart",
        {
          headers,
        }
      );
      setCart(res.data.data);
      calculateTotal(res.data.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (cartItems) => {
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
    setTotal(totalPrice);
  };

  const deleteItem = async (bookId) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/remove-from-cart/${bookId}`,
        {},
        { headers }
      );
      alert(response.data.message);
      const updatedCart = cart.filter((item) => item._id !== bookId);
      setCart(updatedCart);
      calculateTotal(updatedCart);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };


  const placeOrder = async () => {
    if (!cart || cart.length === 0) {
      alert("Your cart is empty! Add items before proceeding.");
      return;
    }
  
    try {
      setLoading(true);
      const orderItems = cart.map((item) => ({
        bookId: item._id,
        userId: localStorage.getItem("id"),
      }));
  
      console.log("📦 Sending Order Request:", JSON.stringify({ order: orderItems }, null, 2));
  
      const response = await axios.post(
        "http://localhost:1000/api/v1/place-order",
        { order: orderItems },
        { headers }
      );
  
      console.log("✅ Order Response:", response.data);
  
      if (response.data.success) {
        alert("🎉 Order placed successfully!");
  
        // Clear cart
        setCart([]);
        setTotal(0);
  
        // Navigate to orders page
        navigate("/order-history");
      } else {
        throw new Error(response.data.message || "Order placement failed!");
      }
    } catch (error) {
      console.error("🚨 Error placing order:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to place order. Try again.");
    } finally {
      setLoading(false);
    }
  };





  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 px-6 md:px-12 py-8 flex flex-col">
      {loading ? (
        <Loader />
      ) : cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-5xl font-semibold text-gray-400 mb-6">
            Your Cart is Empty
          </h1>
          <img
            src="https://cdn.iconscout.com/icon/premium/png-256-thumb/empty-cart-2685174-2232751.png"
            alt="Empty Cart"
            className="lg:h-[50vh]"
          />
          <Link
            to="/"
            className="mt-6 px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="flex-1">
            <h1 className="text-5xl font-semibold text-gray-300 mb-8">
              Your Cart
            </h1>
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center p-4 bg-gray-800 rounded-lg shadow-lg mb-6"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="h-[15vh] object-cover rounded-lg"
                />
                <div className="flex-1 px-4">
                  <h1 className="text-2xl text-gray-100 font-semibold">
                    {item.title}
                  </h1>
                  <p className="text-yellow-400 font-semibold text-lg mt-2">
                    ₹ {item.price}
                  </p>
                </div>
                <button
                  className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                  onClick={() => deleteItem(item._id)}
                >
                  <AiFillDelete size={24} />
                </button>
              </div>
            ))}
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full lg:w-[30%]">
            <h2 className="text-3xl font-semibold text-gray-100 mb-6">
              Order Summary
            </h2>
            <div className="flex justify-between text-lg text-gray-400 mb-4">
              <p>Subtotal:</p>
              <p>₹ {total}</p>
            </div>
            <div className="flex justify-between text-lg text-gray-400 mb-4">
              <p>Delivery:</p>
              <p>₹ 50</p>
            </div>
            <div className="flex justify-between text-2xl font-bold text-white mb-6">
              <p>Total:</p>
              <p>₹ {total + 50}</p>
            </div>
            <button
              className="w-full py-3 bg-green-600 text-white text-lg font-semibold rounded-lg"
              onClick={placeOrder}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
