const { uploadImageToCloudinary } = require("../utils/uploadImageToClodinary");
const Subsection = require("../models/SubSection");
const Section = require("../models/Section");
require("dotenv").config();

//create subSection
exports.createSubSection = async (req, res) => {
  try {
    //fetch data
    const { sectionId, title, description } = req.body;
    const video = req.files.video;

    console.log("sectionId", sectionId);
    console.log("title", title);
    console.log("description", description);
    //console.log("timeduration",timeDuration);
    console.log("video", video);
    //validation

    if (!sectionId || !title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required ",
      });
    }
    console.log(video);
    //upload file to cloudinary
    const videoDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );
    
    console.log("Video details : ", videoDetails);
    //create entry in subsection
    const newSubSection = await Subsection.create({
      title: title,
      timeduration: `${videoDetails.duration}`,
      description: description,
      videoUrl: videoDetails.secure_url,
    });
    console.log("newSubsection", newSubSection);
    //create entry of subsection in section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subsection: newSubSection._id } },
      { new: true }
    )
      .populate("subsection")
      .exec();
    console.log("updatedSection", updatedSection);
    //return rsponse
    res.status(200).json({
      success: true,
      data: updatedSection,
      message: "subSection created successfully ",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update subsection
exports.updateSubSection = async (req, res) => {
  try {
    //fetch data
    const { sectionId, subSectionId, title, description } = req.body;
    console.log("sect");
    const subSection = await Subsection.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    if (title !== undefined) {
      subSection.title = title;
    }

    if (description !== undefined) {
      subSection.description = description;
    }
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video;
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeduration = `${uploadDetails.duration}`;
    }

    await subSection.save();
    const updatedSection = await Section.findById(sectionId).populate(
      "subsection"
    );
    return res.json({
      success: true,
      data: updatedSection,
      message: "Section updated successfully",
    });
    //const video=req.files.videoFile;

    //validation
    //if(!subSectionId||!ti)

    //upload video to cloudinary and delete first video

    //create entru in db

    //return res
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete subsection
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    );
    const subSection = await Subsection.findByIdAndDelete({
      _id: subSectionId,
    });

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" });
    }

    const updatedSection = await Section.findById(sectionId).populate(
      "subsection"
    );
    return res.json({
      data: updatedSection,
      success: true,
      message: "SubSection deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    });
  }
};
