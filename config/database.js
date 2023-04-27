import mongoose from "mongoose";

export const connectDB = () =>{
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data)=>{
        console.log(`Database connected with Host ${data.connection.host}`);
    }).catch((err)=>{
        console.log(`Cant Connect With Database ${err}`)
    })
}