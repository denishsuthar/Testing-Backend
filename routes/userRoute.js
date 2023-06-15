import express from "express";
import { allUsers, deleteUser, getUserDetails, getUserDetailsAdmin, loginUser, logoutUser, registerUser, updateAvatar, updateUser } from "../controller/userController.js";
import {isAdmin, isAuthenticatedUser} from "../middelware/auth.js"
import singleUpload from "../middelware/multer.js";




const router = express.Router();

router.route("/register").post(singleUpload, registerUser);
// router.route("/registernew").post(singleUpload, registerUserMulter);


router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/me").get(isAuthenticatedUser ,getUserDetails);



router.route("/users").get(isAuthenticatedUser, isAdmin, allUsers);

router.route("/user/update").put(isAuthenticatedUser ,updateUser);

router.route("/updateavatar").put(isAuthenticatedUser,singleUpload,updateAvatar);

router.route("/user/:id").delete(isAuthenticatedUser, isAdmin,deleteUser).get(isAuthenticatedUser, isAdmin, getUserDetailsAdmin);







export default router;