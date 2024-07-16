const Category = require("../models/Category");
const Course = require("../models/Course");
const Section = require("../models/Section");

//create Section
exports.createSection = async (req, res) => {
  try {
    //fetch data
    const { sectionName, courseId } = req.body;
    console.log("sectionName", sectionName);
    console.log("courseId", courseId);
    //validation
    if (!sectionName) {
      return res.status(400).json({
        success: false,
        message: "Data missing ",
      });
    }

    //create entry in DB
    const newSection = await Section.create({ sectionName });
    console.log(newSection);

    //create section entry in course
    const updateCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subsection",
          options: { strictPopulate: false },
        },
      })
      .exec()

    //return response
    res.status(200).json({
      success: true,
      message: "Section created successfully",
      data: updateCourse,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//Update Section
exports.updateSection = async (req, res) => {
  try {
    //data fetch
    const { sectionName, sectionId, courseId } = req.body;
    //validation

    if (!sectionName || !sectionId) {
      return res.status(200).json({
        success: false,
        message: "Data missing ",
      });
    }

    //update data
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { sectionName },
      { new: true }
    );
    const updateCourse = await Course.findById(courseId)
    .populate({
        path: "courseContent",
        populate: {
          path: "subsection",
        },
      })
      .exec()

    //return res
    res.status(200).json({
      success: true,
      message: "Section updated successfully ",
      data: updateCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete section
exports.deleteSection = async (req, res) => {
  try {
    //fetch id
    //const {sectionId}=req.params;
    const { sectionId, courseId } = req.body;
    console.log("Section id",sectionId);
    console.log("courseId",courseId);
    //validation
    if (!sectionId) {
      return res.status(400).json({
        success: false,
        message: "data missing ",
      });
    }

    //delete this section from course first
    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      { $pull: { courseContent: sectionId } },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subsection",
        },
      })
      .exec();
    //delete section
    await Section.findByIdAndDelete({ _id: sectionId });

    //return res
    res.status(200).json({
      success: true,
      message: "Section deleted successfully ",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
