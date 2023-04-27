import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import ErrorMiddelware from "./middelware/error.js";

// import multer from "multer";
// import { initializeApp } from "firebase/app";
// import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import {firebaseConfig} from "./config/firebase.js";



const app = express();
app.use(express.json())
app.use(cookieParser());

config({
    path:"./config/config.env"
})

app.get("/", (req, res)=>{
    res.send("Welcome to Backend")
});

// Firesbase Start
// //Initialize a firebase application
// initializeApp(firebaseConfig);
// // Initialize Cloud Storage and get a reference to the service
// const storage = getStorage();

// // Setting up multer as a middleware to grab photo uploads
// const upload = multer({ storage: multer.memoryStorage() });

// app.post("/upload", upload.single("file"), async (req, res) => {
//     try {
//         const dateTime = giveCurrentDateTime();

//         const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

//         // Create file metadata including the content type
//         const metadata = {
//             contentType: req.file.mimetype,
//         };

//         // Upload the file in the bucket storage
//         const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
//         //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

//         // Grab the public url
//         const downloadURL = await getDownloadURL(snapshot.ref);

//         console.log('File successfully uploaded.');
//         return res.send({
//             message: 'file uploaded to firebase storage',
//             name: req.file.originalname,
//             type: req.file.mimetype,
//             downloadURL: downloadURL
//         })
//     } catch (error) {
//         return res.status(400).send(error.message)
//     }
// });

// const giveCurrentDateTime = () => {
//     const today = new Date();
//     const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
//     const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//     const dateTime = date + ' ' + time;
//     return dateTime;
// }
//Firebase End




// Normal Upload
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads');
//     },
//     filename: function(req, file, cb) {
//         cb(null, Date.now()+path.extname(file.originalname))
//     }
// });

// const upload = multer({ storage: storage });

// app.post("/imgupload", upload.single("image"), (req, res)=>{
//     res.send("Image Upload Successfully")
// })


// Import route and use
import userRoute from "./routes/userRoute.js";
import contactRoute from "./routes/contactRoute.js";
import productRoute from "./routes/productRoute.js"

app.use("/api/v1", userRoute)
app.use(contactRoute)
app.use("/api/v1", productRoute)

export default app;

// Using Middelware
app.use(ErrorMiddelware);

