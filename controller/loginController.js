const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRETKEY = process.env.JWT_SECRETKEY;

const authAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email === "admin@gmail.com" && password === "admin") {
      const payload = { username: "vinayaka" }; 
      const token = jwt.sign(payload, JWT_SECRETKEY, { expiresIn: "1h" });

      return res.status(200).json({
        message: "Login successful",
        data: { token },
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error during login " + err });
  }
};

module.exports = { authAdmin };