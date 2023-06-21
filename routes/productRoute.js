import express from "express";
import { allProducts, createProduct, deleteProduct, deleteUserProduct, singleProduct, updateProduct, userProducts } from "../controller/productController.js";
import { isAdmin, isAuthenticatedUser } from "../middelware/auth.js";

const router = express.Router();

router.route("/products").get(allProducts)

router.route("/myproducts").get(isAuthenticatedUser, userProducts)

router.route("/product/delete/:id").delete(isAuthenticatedUser, deleteUserProduct)




// Admin Route
router.route("/admin/product").post(isAuthenticatedUser,isAdmin,createProduct)

router.route("/admin/product/:id").delete(isAuthenticatedUser,isAdmin,deleteProduct).put(isAuthenticatedUser,isAdmin,updateProduct).get(isAuthenticatedUser,singleProduct)



export default router;