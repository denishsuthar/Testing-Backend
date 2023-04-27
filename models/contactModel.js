import mongoose from "mongoose";
import validator from "validator";

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter Name"],
    },
    email:{
        type:String,
        validate:validator.isEmail,
        required:[true, "Please Enter email"],
    },
    MobileNumber:{
        type:Number,
        required:[true, "Please Enter Mobile Number"],
        maxLength:10,
        minLenght:10
    },
    message:{
        type:String,
        required:[true, "Please Enter Message"],
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

export const contact = mongoose.model("contact", contactSchema)