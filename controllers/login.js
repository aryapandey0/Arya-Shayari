import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {

  const { email, password } = req.body;

  try {

    const exist = await User.findOne({ email });

    if (!exist) {
      return res.status(400).json({
        message: "User does not exist kindly register"
      });
    }

    const match = await bcrypt.compare(password, exist.password);

    if (!match) {
      return res.status(400).json({
        message: "Incorrect Password"
      });
    }

    const token = jwt.sign(
      {
        id: exist._id,
        email: exist.email,
        role: exist.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ⭐ token cookie me store
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,   // production me true
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: "Logged in successfully"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Internal server error"
    });

  }
};