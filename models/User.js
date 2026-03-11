import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },
    role:{
    type:String,
    enum:["USER","ADMIN"],
    default:"USER"
 },
 dob:{
    type:Date
 },
 bio:{type:String,default:""},
 profile:{
    type:String,
    default:""
 }
},
{
    timestamps: true
}
);

const User = mongoose.model("User", userSchema);

export default User;