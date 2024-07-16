const express=require("express");
const router=express.Router();

//import the controllers
const {updateProfile, updateProfilePicture, getAllUserDetails, enrolledCourses, deleteAccount, instructorDashboard}=require("../controllers/profile");
const {auth, isInstructor}=require("../middlewares/Auth");

//route 
router.put('/updateProfile',auth,updateProfile);
router.put('/updateProfilePicture',auth,updateProfilePicture);
router.get('/getEnrolledCourses',auth,enrolledCourses);
router.delete('/deleteAccount',auth,deleteAccount);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

//get user details
router.get("/getUserDetails",auth,getAllUserDetails);

module.exports=router;