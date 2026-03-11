import Shayari from "../models/Shayari.js"

export const getShayariByUser = async (req, res) => {

  try {

    const { userId } = req.params

    const userShayari = await Shayari.find({
      author: userId,
      status:"APPROVED"
    }).populate("author", "name email profile role")

    res.status(200).json({
      message: "Shayari fetched successfully",
      data: userShayari
    })

  } catch (err) {

    res.status(500).json({
      message: "Some error occurred",
      error: err.message
    })

  }

}