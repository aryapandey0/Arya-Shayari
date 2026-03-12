import { sendMail } from "../config/email.js"
import Shayari from "../models/Shayari.js"
export const rejectShayari = async (req,res)=>{

 const { id } = req.params

 try{

  const updated = await Shayari.findByIdAndUpdate(
   id,
   { status:"REJECTED" },
   { new:true }
  ).populate("author","email")

  try{
   await sendMail(
    updated.author.email,
    "Shayari Rejected",
    "Sad to inform that your shayari has been rejected by Arya."
   )
   console.log("Reject email sent ")
  }catch(mailErr){
   console.log("Mail failed:", mailErr)
  }

  res.status(200).json({message:"Rejected"})

 }catch(err){

  console.log(err)
  res.status(500).json({message:"not successful"})

 }

}