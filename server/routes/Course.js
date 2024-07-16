const express = require("express");
const router = express.Router();
const {
  createCategory,
  showAllCategories,
  categoryPageDetails,
} = require("../controllers/category");
const {
  auth,
  isAdmin,
  isInstructor,
  isStudent,
} = require("../middlewares/Auth");
const {
  createCourse,
  getCourseDetails,
  getAllCourses,
  editCourse,
  getInstructorCourses,
  deleteCourse,
  getFullCourseDetails,
} = require("../controllers/course");
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/section");
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/subSection");
const {
  createRating,
  getAvgRating,
  getAllRating,
} = require("../controllers/ratingAndReview");

const {updateCourseProgress} =require("../controllers/courseProgress");
// const { RouterProvider } = require("react-router-dom");

//                     COURSE ROUTES

router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/getCourseDetails", getCourseDetails);
router.get("/getAllCourses", getAllCourses);
router.post("/editCourse", auth, isInstructor, editCourse);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
router.delete("/deleteCourse",auth,isInstructor,deleteCourse);
router.post("/getFullCourseDetails",auth,getFullCourseDetails);
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)

//                    SECTION ROUTES

router.post("/createSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.delete("/deleteSection", auth, isInstructor, deleteSection);

//                     SUBSECTIONN ROUTES

router.post("/createSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.delete("/deleteSubSection", deleteSubSection);

//                    CATEGORY ROUTES

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

//                RATING AND REVIEWS

router.post("/createRating", auth, isStudent, createRating);
router.post("/getAvgRating", getAvgRating);
router.get("/getAllRating", getAllRating);
router.get("/getReviews", getAllRating)

module.exports = router;
