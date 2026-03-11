import User from "../models/User.js";

export const getUserById = async(req,res)=>{
const {id} = req.params

try{
const user = await User.findById(id).select("-password")
res.status(200).json({user:user})
}
catch(err){
    res.status(500).json({message:err})
}

 }