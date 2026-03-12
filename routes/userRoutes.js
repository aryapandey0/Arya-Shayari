import express from "express";

import { register } from "../controllers/register.js";
import { login } from "../controllers/login.js";
import addShayari from "../controllers/AddShayari.js";
import { resolveUser } from "../middlewares/resolveUser.js";
import { deleteUser } from "../controllers/deleteUser.js";
import { getUserById } from "../controllers/getUserById.js";
import upload from "../config/multer.js";
import { uploadProfileImage } from "../controllers/addProfile.js";
import { getAllUsers } from "../controllers/getAllUsers.js";
import User from "../models/User.js";
import { resolveRole } from "../middlewares/resolveRole.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me",resolveUser,(req,res)=>{
    res.json(req.user)
})
router.get("/all",resolveUser,getAllUsers)
router.get("/delete/:id",resolveUser,resolveRole("ADMIN"),deleteUser)
router.put("/bio",resolveUser,async(req,res)=>{
    const updated = await User.findByIdAndUpdate(req.user._id,{bio:req.body.bio,dob:req.body.dob})
    res.status(200).json({message:"Bio and Dob Updated"})
})

router.post("/logout",(req,res)=>{

    res.clearCookie("token",{
        httpOnly:true,
        sameSite:"lax"
    })

    res.json({
        message:"Logged out successfully"
    })
})
router.delete("/delete/:userId",deleteUser)
router.get("/:id",resolveUser,getUserById)

router.put(
  "/upload-profile",
  resolveUser,
  upload.single("profile"),
  uploadProfileImage
);



export default router;