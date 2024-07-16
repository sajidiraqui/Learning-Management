const mongoose=require("mongoose");

const RatingAndReviewsSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    rating:{
        type:Number,
        requireed:true,
    },
    review:{
        type:String,
    },
    course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},
})

module.exports=mongoose.model("RatingAndReviews",RatingAndReviewsSchema);