import { sendMail } from "../config/email.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {

const { name, email, password } = req.body;

if (!name || !email || !password) {
    return res.status(400).json({ message: "Fill all fields" });
}

try {

const exist = await User.findOne({ email });

if (exist) {
    return res.status(400).json({ message: "User already exists" });
}
let role="USER"
if(email == "adminarya@gmail.com" && password == "12345")role="ADMIN"

const hashed = await bcrypt.hash(password, 10);

const user = await User.create({
    name,
    email,
    password: hashed,
    role:role
});

 /*try{
await sendMail(email,"Welcome to Arya-Shayari",  `Hello ${name}, you have successfully registered to Arya-Shayari`)
 }
 catch(err){
    res.status(500).json({message:"Mail couldnt be mailed"})
 }*/
user.password=undefined

res.status(201).json({
    message: "User registered successfully",
    data: user
});

} catch (err) {

console.error("User can't register", err);

res.status(500).json({
    message: "Internal server error"
});

}
};