import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AllBooks from "./pages/AllBooks"; 
import Login from "./pages/LogIn";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
import AllOrders from "./pages/AllOrders";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";
import { Outlet } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
          {/* Nested Routes under Profile */}
          <Route index element={role === "user" ? <Favourites /> : <AllOrders />} />
          <Route path="order-history" element={<UserOrderHistory />} />
          <Route path="settings" element={<Settings />} />
          {role === "admin" && <Route path="add-book" element={<AddBook />} />}
        </Route>
        <Route path="/LogIn" element={<Login />} />
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/updateBook/:id" element={<UpdateBook />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
