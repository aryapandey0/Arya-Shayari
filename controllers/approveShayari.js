import { sendMail } from "../config/email.js"
import Shayari from "../models/Shayari.js"

export const approveShayari = async (req,res)=>{

  const { id } = req.params

  try{

    const updated = await Shayari.findByIdAndUpdate(
      id,
      { status:"APPROVED" },
      { returnDocument:"after" }
    ).populate("author","email")

 /*   await sendMail(
      updated.author.email,
      "Shayari Approved",
      "Glad to inform that your shayari has been approved by Arya. You can check it in the app."
    )
  console.log("Approve email sent ")
    res.status(200).json({ message:"Approved" })
*/
  }
  catch(err){

    res.status(500).json({ message:"not successful" })

  }

}