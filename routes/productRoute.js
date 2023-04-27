import express from "express";
import { allProducts, createProduct, deleteProduct, singleProduct, updateProduct } from "../controller/productController.js";
import { isAdmin, isAuthenticatedUser } from "../middelware/auth.js";

const router = express.Router();

router.route("/products").get(allProducts)



// Admin Route
router.route("/admin/product").post(isAuthenticatedUser,isAdmin,createProduct)

router.route("/admin/product/:id").delete(isAuthenticatedUser,isAdmin,deleteProduct).put(isAuthenticatedUser,isAdmin,updateProduct).get(isAuthenticatedUser,singleProduct)



export default router;