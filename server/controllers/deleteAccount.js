const User = require("../models/User");
const Profile=require("../models/Profile");

//How to schedule this process
exposrts.deleteAccount= async (req,res) => {
    try{
        //fetch id
        const id=req.user.id;

        const userDetails= await User.findById({_id:id});

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"User is not found "
            })
        }

        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        await User.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success:true,
            message:"User account deleted successfully "
        })
    } catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}