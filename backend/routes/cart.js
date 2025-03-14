const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");


router.put("/add-to-cart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookinCard = userData.cart.includes(bookid);
    if (isBookinCard) {
      return res.json({
        status: "Success",
        message: "Book is already in cart "
      });
    }
    await User.findByIdAndUpdate(id, {
      $push: { cart: bookid },
    });
    return res.json({
      status: "Success",
      message: "Book added to cart "
    });
  } catch (error) {
    return res.status(500).json({ message: "An Error Occured " });
  }
})

router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;
    await User.findByIdAndUpdate(id, {
      $pull: { cart: bookid },
    });
    return res.json({
      status: "Success",
      message: "Book removed from cart "
    });
  } catch (error) {
    return res.status(500).json({ message: "An Error Occured " });
  }
})



router.get("/get-user-cart", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("cart");
    const cart = userData.cart.reverse();
    return res.json({
      status: "Success",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error Occured " });
  }
})


module.exports = router;