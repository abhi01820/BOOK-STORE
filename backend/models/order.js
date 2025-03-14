// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true }, 
//     status: { type: String, enum: ["Pending", "Out for Delivery", "Delivered", "Cancelled"], default: "Pending" },
//     orderDate: { type: Date, default: Date.now }
// });

// const Order = mongoose.model("Order", orderSchema);
// module.exports = Order;
// const mongoose = require("mongoose");

// const OrderSchema = new mongoose.Schema({
//   bookId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Book",
//     required: true,
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const OrderModel = mongoose.model("Order", OrderSchema);

// module.exports = OrderModel;
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
});

const OrderModel = mongoose.model("Order", OrderSchema);
module.exports = OrderModel;
