import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected Successfully...✅")
    }
    catch(err){
        console.log("Database could not connect due to ",err)
        process.exit(1);
    }
}

export default connectDB