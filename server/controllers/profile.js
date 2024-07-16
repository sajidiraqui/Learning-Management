

//profile

const Profile = require("../models/Profile");
const User=require("../models/User");
const {uploadImageToCloudinary}=require("../utils/uploadImageToClodinary");
const Course =require("../models/Course");

exports.updateProfile= async (req,res) => {
    try{
        //fetch data 
        const {dateOfBirth="",about="",gender,contactNumber}=req.body;
        //validation
        if(!gender||!contactNumber){
            return res.status(400).json({
                success:false,
                message:"data missing "
            });
        }

        //fetch id
        console.log("a");
        const id=req.user.id;
        console.log("b");

        //update profile 
        //const profileDetails=await Profile.findById({_id:id});
        const userDetails = await User.findById(id);
        console.log(userDetails);
		const profile = await Profile.findById(userDetails.additionalDetails);
        console.log("c");
        profile.dateOfBirth=dateOfBirth;
        profile.about=about;
        profile.gender=gender;
        profile.contactNumber=contactNumber;
        console.log("d");
        const data =await profile.save();
        console.log("e");
        console.log(data);
        const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec();
        //return res
        console.log("Updated details",updatedUserDetails);
        res.status(200).json({
            updatedUserDetails,
            success:true,
            message:'profile updated successfully '
        })
    } catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//getAllUSerDetails
exports.getAllUserDetails = async(req,res) =>{
    try{
        //get user id
        const id=req.user.id;

        //get details
        const userDetails=await User.findById(id).populate("additionalDetails")
                                                 .exec();
        console.log(userDetails);
        
        res.status(200).json({
            success:true,
            message:"course details fetched successfully ",
            data:userDetails
        })

    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
}

//delete account
exports.deleteAccount= async(req,res)=>{
    try{
        //get id

        const id=req.user.id;
        console.log("id",id);
        const user=await User.findById(id);
        console.log("user",user);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }

        //delete associated profile
        await Profile.findByIdAndDelete({_id:user.additionalDetails});
        console.log("profile deleted")
        //delte user
        await User.findByIdAndDelete(id);
        console.log("user deleted")
        return res.status(200).json({
            success:true,
            message:"User account deleted successfully "
        })
    } catch(err){
        res.status(500).json({
            succces:false,
            message:err.message
        })
    }
}

//get Enrroled courses
exports.enrolledCourses=async (req,res) =>{
    try{
        //get user id
        const id=req.user.id;

        const user=await User.findById(id)
        .populate({
            path:"courses",
            populate:{
                path: "instructor",
                    populate: {
                    path: "additionalDetails",
                } ,
            },
            populate:{
                path: "courseContent",
                populate: {
                path: "subsection",
            },
            }
        })
        .exec();

        if(!user){
            return res.status(400).json({
                success:false,
                message:`user not found with this ${id} `
            })
        }
        console.log("course",user.courses);
        return res.status(200).json({
            success:true,
            data:user.courses
        })
    } catch(err){
        res.status(500).json({
            succces:false,
            message:err.message
        })
    }
}

//update profile picture
exports.updateProfilePicture=async(req,res)=>{
    try{
        //get id
        //console.log("id ...")
        const id= req.user.id;
        console.log("id...",id);
        //fetch image
        //console.log("req.files ",req.files);
        const profilePicture=req.files.displayPicture;
        //console.log("Profile ",profilePicture);
        //upload image to cloudinary
        const image=await uploadImageToCloudinary(profilePicture,process.env.FOLDER_NAME,1000,1000);
        console.log(image);
        console.log("b");
        //update profile
        const updatedUser=await User.findByIdAndUpdate({_id:id},{image:image.secure_url},{new:true});

        res.status(200).json({
            success:true,
            message:"Picture updated successfully ",
            data:updatedUser
        })
    } catch(err){
        res.status(500).json({
            succces:false,
            message:err.message
        })
    }
}

exports.instructorDashboard = async (req, res) => {
    try {
      const courseDetails = await Course.find({ instructor: req.user.id })
  
      const courseData = courseDetails.map((course) => {
        const totalStudentsEnrolled = course.studentsEnrolled.length
        const totalAmountGenerated = totalStudentsEnrolled * course.price
  
        // Create a new object with the additional fields
        const courseDataWithStats = {
          _id: course._id,
          courseName: course.courseName,
          courseDescription: course.courseDescription,
          // Include other course properties as needed
          totalStudentsEnrolled,
          totalAmountGenerated,
        }
  
        return courseDataWithStats
      })
  
      res.status(200).json({ courses: courseData })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server Error" })
    }
  }