const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
const Book = require("../models/book");


router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res.status(400).json({ message: "You are not having access to perform admin work " });
    }



    const book = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language

    });
    await book.save();
    res.status(200).json({ message: "Book Added Successfully " });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error " });
  }
})


router.put("/update-book/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params; 
    const updateData = req.body; 
    

    if (!id) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book Updated Successfully", book: updatedBook });

  } catch (error) {
    console.error("Update Book Error:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
});


router.delete("/delete-book/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params; 

    if (!id) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    const deletedBook = await Book.findByIdAndDelete(id); // ✅ Delete book from DB

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully" });

  } catch (error) {
    console.error("Delete Book Error:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
});




router.get("/get-all-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: books
    });
  } catch (error) {
    return res.status(500).json({ message: "An Error Occured" });
  }
})

router.get("/get-recent-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.json({
      status: "Success",
      data: books
    });
  } catch (error) {
    return res.status(500).json({ message: "An Error Occured" });
  }
})


router.get("/get-book-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.json({
      status: "Success",
      data: book,
    });
  } catch (error) {
    return res.status(500).json({ message: "An Error Occured" });
  }
})



module.exports = router;