const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
require("dotenv").config(); 



router.post("/signUp", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    if (!username || !email || !password || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (username.length < 4) {
      return res.status(400).json({ message: "Username length should be greater than 4" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (password.length < 4) {
      return res.status(400).json({ message: "Password length should be greater than 4" });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashPass,
      address,
    });

    await newUser.save();
    return res.status(201).json({ message: "SignUp Successfully" });

  } catch (error) {
    console.error("SignUp Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/signIn", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const authClaims = {
      id: existingUser._id,
      username: existingUser.username,
      role: existingUser.role
    };

    const token = jwt.sign(authClaims, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.status(200).json({
      id: existingUser._id,
      role: existingUser.role,
      token: token,
    });

  } catch (error) {
    console.error("SignIn Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get-user-info", authenticateToken, async (req, res) => {
  try {
    const { id } = req.user; // Get ID from decoded token

    const data = await User.findById(id).select("-password"); // Exclude password
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Get User Info Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



router.put("/update-address",authenticateToken,async (req,res)=>{
  try {
    const {id}=req.headers;
    const {address}=req.body;
    await User.findByIdAndUpdate(id,{address:address});
    return res.status(200).json({message:"Address Updated Successfully "});
  } catch (error) {
    res.status(500).json({message:"Internal Server Error "});
  }
})


module.exports = router;
