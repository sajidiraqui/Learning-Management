const RatingAndReviews = require("../models/RatingAndReviews");
const Course=require('../models/Course');

exports.createRating=async(req,res)=>{
    try{
        //get user id
        const userId=req.user.id;

        //fetch data from req body (rating review ,courseId)
        const {rating,review,courseId}=req.body;

        //check if user is enrolled or not
        const courseDetails=await Course.findOne({_id:courseId,
            studentsEnrolled:{$elemMatch:{$eq:userId}}});

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Students not enrolled",
            })
        }

        //check user already reviewd or not
        const alreadyReviewd=await RatingAndReviews.findOne({
            user:courseId,
            course:courseId
        })

        if(alreadyReviewd){
            return res.status(400).json({
                success:false,
                message:'course is already reviewd'
            });
        }

        //create rating and review
        const ratingAndReview=await RatingAndReviews.create({rating,review,
                                                            course:courseId,
                                                            user:userId
                                                        });

        //add this course
        const updatedCourse=await Course.findByIdAndUpdate({_id:courseId},{$push:{ratingAndReviews:ratingAndReview}},{new:true});

        //return res
        res.status(200).json({
            success:true,
            data:{
                ratingAndReview,
                updatedCourse
            },
        });
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

//get avg rating
exports.getAvgRating=async(req,res)=>{
    try{
        //get course Id
        const {courseId}=req.body;

        //calculate avg rating
        const result=await RatingAndReviews.aggregate([{
            $match:{
                course:new mongoose.Types.ObjectId(courseId),
            }
        },
        {
            $group:{
                _id:null,
                avgRating:{$avg:"rating"}
            }
        }
    ]);

        //return res
        if(result.length > 0 ){
            return res.status(200).json({
                success:true,
                avgRating:result[0].avgRating,
            })
        }
        return res.status(200).json({
            success:true,
            avgRating:0
        })
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

//get all rating

exports.getAllRating=async(req,res)=>{
    try{
        const allReviews=await RatingAndReviews.find({})
                                               .sort({rating:"desc"})
                                               .populate({
                                                path:"user",
                                                select:"firstName lastName email image",
                                            })
                                            .populate({
                                                path:"course",
                                                select: "courseName",
                                            })
                                            .exec();
        return res.status(200).json({
        success:true,
        message:"All reviews fetched successfully",
        data:allReviews,
        });
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}