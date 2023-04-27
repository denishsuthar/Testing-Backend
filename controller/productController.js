import { catchAsyncError } from "../middelware/catchAsyncError.js";
import { Product } from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";



// Get All Products
export const allProducts = catchAsyncError(async(req, res, next)=>{
    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    })
})

// Create Product --Admin
export const createProduct = catchAsyncError(async(req, res, next)=>{
    req.body.user = req.user.id;
    const {name, description, price, category} = req.body;
    
    if(!name || !description || !price || !category) return next(new ErrorHandler("Please Fill All Fields", 400));

    

    const product = await Product.create({
        name, description, price, category
    })

    res.status(201).json({
        success:true,
        product
    })
})

// Delete Product --Admin
export const deleteProduct = catchAsyncError(async (req, res, next)=>{
    const product = await Product.findById(req.params.id);
    if(!product) return next(new ErrorHandler("Product Not Found", 404));

    await product.deleteOne();

    res.status(200).json({
        success:true,
        message:"product Deleted Successfully"
    })
})

// Update Product --Admin
export const updateProduct = catchAsyncError(async(req, res, next)=>{
    const {name, description, price, category, Stock} = req.body;

    const product = await Product.findById(req.params.id);
    if(name) product.name = name;
    if(description) product.description = description;
    if(price) product.price = price;
    if(category) product.category = category;
    if(Stock) product.Stock = Stock;


    await product.save();

    res.status(200).json({
        success:true,
        message:"Product Updated Succefully"
    })
})

// Get Single Product
export const singleProduct = catchAsyncError(async(req, res, next)=>{
    const product = await Product.findById(req.params.id);
    res.status(200).json({
        success:true,
        product
    })
})