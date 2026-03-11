import Shayari from "../models/Shayari.js"

export const getPendingShayari=async(req,res)=>{
    try{
    const shayaries = await Shayari.find({status:"PENDING"}).populate("author","name email profile")
  
res.status(200).json({data:shayaries})
    }
    catch(err){
        res.status(500).json(err)
    }
}