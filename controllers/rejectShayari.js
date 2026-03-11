import Shayari from "../models/Shayari.js"

export const rejectShayari=async(req,res)=>{
    const {id} = req.params
    try{
    const updated = await Shayari.findByIdAndUpdate(id,{status:"REJECTED"})
    .populate("author","email")
    
        await sendMail(
          updated.author.email,
          "Shayari Rejected",
          "Sad to inform that your shayari has been rejected by Arya.It must contain some violent words"
        )
    res.status(200).json({message:"Rejected"})}
    catch(err){
        res.status(500).json({message:"not successfull"})
    }
}