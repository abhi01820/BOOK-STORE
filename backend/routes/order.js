const router=require("express").Router();
const { authenticateToken} = require("./userAuth");
const Book=require("../models/book");
const OrderModel=require("../models/order");
const User=require("../models/user");





router.post("/place-order", async (req, res) => {
  try {
    console.log("📦 Order Request Body:", JSON.stringify(req.body, null, 2));

    // Check if order exists
    if (!req.body.order || req.body.order.length === 0) {
      return res.status(400).json({ success: false, message: "Order is empty" });
    }

    // Ensure each order item has bookId and userId
    for (let item of req.body.order) {
      if (!item.bookId || !item.userId) {
        console.error("🚨 Missing bookId or userId:", item);
        return res.status(400).json({
          success: false,
          message: "Missing bookId or userId in order",
        });
      }
    }

    // Save order in database
    const newOrder = new OrderModel({ items: req.body.order });
    await newOrder.save();

    res.status(201).json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("🔥 Internal Server Error:", error); // Log full error
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});








router.get("/all-orders", async (req, res) => {
  try {
      const orders = await OrderModel.find()
          .populate("userId", "name email")  // Ensure "userId" is used
          .populate("bookId", "title author") // Ensure "bookId" is used
          .sort({ orderDate: -1 });

      res.json(orders);
  } catch (err) {
      res.status(500).json({ message: "Error fetching orders", error: err });
  }
});



router.get("/get-all-orders", authenticateToken, async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({
        path: "book",
        select: "title description price", 
        
      })
      .populate({
        path: "user",
        select: "name email", 

      })
      .sort({ createdAt: -1 });

    console.log("Fetched Orders:", userData); 


    return res.json({
      status: "Success",
      data: userData,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({
      message: "An Error Occurred",
    });
  }
});




router.put("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    
    if (!status) {
      return res.status(400).json({ message: "Status is required." });
    }
    
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    
    order.status = status;
    await order.save();

    return res.json({
      status: "Success",
      message: "Status Updated Successfully",
      updatedOrder: order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "An Error Occurred" });
  }
});




module.exports=router;