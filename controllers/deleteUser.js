import User from "../models/User.js";

export const deleteUser = async (req, res) => {

  try {

    const { userId } = req.params;

    const deleted = await User.findByIdAndDelete(userId);

    if(!deleted){
      return res.status(404).json({message:"User not found"});
    }

    deleted.password = undefined;

    res.json({
      message: "Deleted Successfully",
      user: deleted
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Error deleting user"
    });

  }

};