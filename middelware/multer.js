import multer from "multer";
import path from "path"

const storage = multer.memoryStorage();

const singleUpload = multer({storage}).single("file");

export default singleUpload;



// // Use this as Normal Upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const singleUpload = multer({storage}).single("file");

// export default singleUpload;
