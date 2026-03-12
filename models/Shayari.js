import mongoose from "mongoose";

const shayariSchema = new mongoose.Schema(
{
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category:{
        type:String,
       enum: [
  "LOVE",
  "ATTITUDE",
  "SAD",
  "BROKEN",
  "MOTIVATION",
  "FRIENDSHIP",
  "LIFE",
  "OTHER"
],
        default:"OTHER",
        required:true,

    },

    content: {
        type: String,
        required: true
    },
    status:{
        type:String,
        enum:["PENDING","APPROVED","REJECTED"],
        default:"PENDING"
    }
},
{
    timestamps: true
}
);

const Shayari = mongoose.model("Shayari", shayariSchema);

export default Shayari;