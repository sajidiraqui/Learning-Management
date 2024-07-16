const Category = require("../models/Category");
const { uploadImageToCloudinary } = require("../utils/uploadImageToClodinary");
const Course = require("../models/Course");
const User = require("../models/User");
const Section = require("../models/Section");
const Subsection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration");

require("dotenv").config();

//careate courses

exports.createCourse = async (req, res) => {
  try {
    //fetch data
    var {
      courseName,
      courseDescription,
      whatWillYouLearn,
      price,
      category,
      tag:_tag,
      instructions:_instructions,
      status,
    } = req.body;

    const tag = JSON.parse(_tag)
    const instructions = JSON.parse(_instructions)

    //file fetch
    const thumbnail = req.files.thumbnailImage;
    
    console.log("thumbanail", thumbnail);
    console.log("courseName", courseName);
    console.log("courseDescription", courseDescription);
    console.log("whatwill", whatWillYouLearn);
    console.log("price", price);
    console.log("category", category);
    console.log("tag", tag);
    console.log("instructions",instructions);
    //validation
    if (
      !courseName ||
      !courseDescription ||
      !whatWillYouLearn ||
      !price ||
      !category ||
      !tag.length ||
      !thumbnail ||
      !instructions.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required ",
      });
    }
    console.log("a");

    if (!status || status === undefined) {
      status = "Draft";
    }
    // Check if the user is an instructor
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    });

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      });
    }

    //category validation for postman

    const categoryDetails = await Category.findById(category); //catgeory -> id hai
    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message: "This category are not found",
      });
    }
    console.log("b");
    //image upload to cloudinary
    const thumbnailDetails = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    console.log(thumbnailDetails);
    //course create entry in db
    const course = await Course.create({
      courseName,
      courseDescription,
      instructor: req.user.id,
      whatWillYouLearn,
      price,
      category:categoryDetails._id,
      tag,
      instructions,
      status: status,
      thumbnail: thumbnailDetails.secure_url,
    });

    //course ki entry in user
    console.log("course information",course);
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { $push: { courses: course._id } },
      { new: true }
    );
    console.log(updatedUser);
    //course ki entry in category
    const updateCategory = await Category.findByIdAndUpdate(
      { _id: category },
      { $push: { course: course._id } },
      { new: true }
    );
    console.log(updateCategory);
    //response
    res.status(200).json({
      success: true,
      data: course,
      message: "Course Created Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//edit course
exports.editCourse = async (req, res) => {
  try {
    console.log("start");
    const { courseId } = req.body;
    console.log("CourseId", courseId);
    const updates = req.body;
    console.log("Updates", updates);
    const course = await Course.findById(courseId);
    console.log("course", course);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update");
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        console.log("key", key);
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key]);
        } else {
          course[key] = updates[key];
        }
      }
    }

    await course.save();
    console.log("second");
    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subsection",
        },
      })
      .exec();
    console.log("third");
    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//get ALL courses
exports.getAllCourses = async (req, res) => {
  try {
    //fetch courses
    const courses = await Course.find(
      {},
      {
        courseName: true,
        courseDescription: true,
        whatYouWillLearn: true,
        price: true,
        thumbnail: true,
        ratingAndReviwis: true,
        studentsEnrolled: true,
      }
    );

    res.status(200).json({
      success: true,
      data: courses,
      message: "All courses fetched successfully ",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//get course details
exports.getCourseDetails = async (req, res) => {
  try {
    //get course id
    const courseId = req.body.courseId;
    console.log(courseId);
    //fetch courseDtails
    const courseDetails = await Course.find({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      //.populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subsection",
          //select: "videoUrl",
        },
      })
      .exec();
    console.log("courseDetails",courseDetails);
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: "course detials not found ",
      });
    }

    let totalDurationInSeconds = 0
    courseDetails.courseContent?.forEach((content) => {
      content.subsection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeduration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

     const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getInstructorCourses = async (req, res) => {
  const userId = req.user.id;

  try {
    const instructorCourses = await Course.find({
      instructor: userId,
    }).sort({ createdAt: -1 });
    console.log("instructor course", instructorCourses.length);
    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled;
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      });
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent;
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId);
      if (section) {
        const subSections = section.subsection;
        for (const subSectionId of subSections) {
          await Subsection.findByIdAndDelete(subSectionId);
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId);
    }

    //delete course from user schema
    await User.findByIdAndUpdate(
      {
        _id: req.user.id,
      },
      {
        $pull: {
          courses: course._id,
        },
      },
      { new: true }
    )
    // Delete the course
    await Course.findByIdAndDelete(courseId);


    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;
    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subsection",
        },
      })
      .exec();

    console.log('course content',courseDetails); 

    let courseProgressCount = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    });

    console.log("courseProgressCount : ", courseProgressCount);

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    let totalDurationInSeconds = 0;

    courseDetails.courseContent.forEach((content) => {
      content.subsection.forEach((lecture) => {
        const timedurationInSeconds = parseInt(lecture.timeduration);
        totalDurationInSeconds += timedurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      success:true,
      data:{
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      }
    })

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
};
