import {User} from "../models/userModel.js"
import {catchAsyncError} from "../middelware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import {sendToken} from "../utils/sendToken.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js"



// Registed User
export const registerUser = catchAsyncError(async(req, res, next)=>{
    const {name, email, password, confirmPassword} = req.body;
    const file = req.file;
    if(!name || !email || !password || !file || !confirmPassword) return next(new ErrorHandler("Please Fill All Fields", 400));

    if(password !== confirmPassword){
        return next(new ErrorHandler("Passoword Not Match", 400))
    }

    let user = await User.findOne({email});
    if(user) return next(new ErrorHandler("User Alredy Exists", 409));

    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
        folder:"avatars"
    });

    user = await User.create({
        name, 
        email, 
        password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        }
    });

    sendToken(res, user, "Registed Successfully", 201);
})

// Register User with Normal Avatar Upload
// export const registerUserMulter = catchAsyncError(async(req, res, next)=>{
//     const {name, email, password, confirmPassword} = req.body;
//     const avatar = req.file
//     if(!name || !email || !password || !avatar || !confirmPassword) return next(new ErrorHandler("Please Fill All Fields", 400));

//     if(password !== confirmPassword){
//         return next(new ErrorHandler("Passoword Not Match", 400))
//     }

//     let user = await User.findOne({email});
//     if(user) return next(new ErrorHandler("User Alredy Exists", 409));


//     user = await User.create({
//         name, 
//         email, 
//         password,
//         avatar
//     });

//     sendToken(res, user, "Registed Successfully", 201);
// })

// Login User
export const loginUser = catchAsyncError(async (req,res,next) =>{
    const {email, password} = req.body;
    if(!email || !password) return next(new ErrorHandler("Please enter all fields", 400));

    const user = await User.findOne({email}).select("+password");
    if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401))

    const isMatch = await user.comparePassword(password);
    if(!isMatch) return next(new ErrorHandler("Incorrect Email or Password", 401));

    sendToken(res, user, `Welcome Back ${user.name}`, 200);

    // if(user.password === password){
    //     sendToken(res, user, `Welcome Back ${user.name}`, 200);
    // } else{
    //     return next(new ErrorHandler("Incorrect Email or Password", 401))
    // }
});

// Logout User
export const logoutUser = catchAsyncError(async (req,res,next) =>{
    res.status(200).cookie("token", null,{
        expires: new Date(Date.now()),
        httpOnly:true,
        // secure:true,
        // sameSite:"none"
    }).json({
        success: true,
        message: "Logout Successfully",
    })
});

// Get User Details
export const getUserDetails = catchAsyncError(async (req,res,next) =>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        sucess:true,
        user,
    })
});

// All Users
export const allUsers = catchAsyncError(async (req, res, next)=>{
    const users = await User.find();
    res.status(200).json({
        success:true,
        users
    })
})

// Delete User
export const deleteUser = catchAsyncError(async(req, res, next)=>{
    const user = await User.findById(req.params.id);
    if(!user) return next(new ErrorHandler("User not found", 404));

    await user.deleteOne();

    res.status(200).json({
        success:true,
        message:"User Deleted Successfully"
    })
})

// Update User
export const updateUser = catchAsyncError(async(req, res, next)=>{
    const {name, email} = req.body

    const user = await User.findById(req.user.id);
    if(name) user.name = name;
    if(email) user.email = email;

    await user.save();

    res.status(200).json({
        success:true,
        message:"Profile Updated Successfully"
    })

})
    

// Update User Avatar Profile Pic
export const updateAvatar = catchAsyncError(async(req, res, next)=>{
    const file = req.file;
    const user = await User.findById(req.user.id);

    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
        folder:"avatars"
    });
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    user.avatar = {
        public_id:myCloud.public_id,
        url:myCloud.secure_url,
    }
    await user.save();

    res.status(200).json({
        success:true,
        message:"Profile Avatar Updated Successfully"
    })
})

// Get Single User by Params
export const getUserDetailsAdmin = catchAsyncError(async(req, res, next)=>{
    const user = await User.findById(req.params.id);
    if(!user) return next(new ErrorHandler("User Not found", 404));

    res.status(200).json({
        success:true,
        user
    })
})