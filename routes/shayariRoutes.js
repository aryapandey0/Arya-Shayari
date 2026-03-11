
import express from "express";
import addShayari from "../controllers/AddShayari.js";
import { resolveUser } from "../middlewares/resolveUser.js";
import { getMyShayari } from "../controllers/getMyShayari.js";
import { getShayariByUser } from "../controllers/getShayariByUser.js";
import { getPendingShayari } from "../controllers/getPendingShayari.js";
import { resolveRole } from "../middlewares/resolveRole.js";
import { approveShayari } from "../controllers/approveShayari.js";
import { rejectShayari } from "../controllers/rejectShayari.js";
import Shayari from "../models/Shayari.js";

const router = express.Router()

router.post("/add", resolveUser, addShayari);
router.delete("/delete/:id",resolveUser,resolveRole("ADMIN"),async(req,res)=>{
    const deleted = await Shayari.findByIdAndDelete(req.params.id)
    res.status(200).json({message:"Deleted Siccessfully"})
})

router.get("/all",resolveUser,async(req,res)=>{
    const shayari = await Shayari.find({status:"APPROVED"}).populate("author","name email profile role")
    res.status(200).json({data:shayari})
})
router.get("/my",resolveUser,getMyShayari)
router.get("/pending",resolveUser,resolveRole("ADMIN"),getPendingShayari)

router.get("/rejected",resolveUser,resolveRole("ADMIN"),async(req,res)=>{
const rejected = await Shayari.find({status:"REJECTED"}).populate("author","name email profile")
res.status(200).json({data:rejected})
})

router.get("/:userId",resolveUser,getShayariByUser)

router.put("/approve/:id",resolveUser,resolveRole("ADMIN"),approveShayari)
router.put("/reject/:id",resolveUser,resolveRole("ADMIN"),rejectShayari)


export default router;