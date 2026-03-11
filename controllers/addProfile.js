import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";

export const uploadProfileImage = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }
    

    const result = await cloudinary.uploader.upload_stream(
      { folder: "arya-shayari-profiles" },
      async (error, uploaded) => {

        if (error) {
          return res.status(500).json({ message: error.message });
        }

        const user = await User.findByIdAndUpdate(
          req.user._id,
          { profile: uploaded.secure_url },
          { new: true }
        );
        

        res.json({
          message: "Profile image uploaded",
          image: uploaded.secure_url,
          user
        });

      }
    );

    result.end(req.file.buffer);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

};