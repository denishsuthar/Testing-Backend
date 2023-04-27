import { catchAsyncError } from "../middelware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import emailSender from "../utils/sendEmail.js";



export const contactForm = catchAsyncError(async (req, res, next) => {
    const { name, email, MobileNumber, message } = req.body;
    if (!name || !email || !MobileNumber || !message) return next(new ErrorHandler("Please Fill All Fields", 400));

    emailSender({
        name, email:req.body.email, MobileNumber, message
    });

    res.status(200).json({
        success: true,
        message: "Email sent successfully",
    })
})