import Shayari from "../models/Shayari.js";

export const getMyShayari = async (req, res) => {

  try {

    const shayaries = await Shayari.find({
      author: req.user._id,
      status:"APPROVED"
    }).populate("author" ,"name email profile role")

    console.log("req.user is ",req.user)

    res.status(200).json({
      message: "Successfully fetched all Shayaries",
      data: shayaries
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};