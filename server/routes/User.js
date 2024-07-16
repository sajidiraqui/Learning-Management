const express = require("express");
const router= express.Router();

//import the required controllers
const {Login,SignUp, sendOTP, changePassword}=require("../controllers/user");
const {resetPasswordToken,resetPassword}=require("../controllers/resetPassword");
const {auth}=require("../middlewares/Auth");

//Route for user login
router.post('/login',Login);

//Route for user signup
router.post('/signup',SignUp);

//Route for sending otp to the user's email
router.post('/sendotp',sendOTP);

//Route for changing password
router.post('/changePassword',auth,changePassword);


//                       RESET PASSWORD


//route for generating a reset password token 
router.post("/reset-password-token",resetPasswordToken)

//route for reset password 
router.post("/reset-password",resetPassword);

module.exports=router;