const mongoose=require("mongoose");
const mailSender=require("../utils/mailSender");

const otpSchema=new mongoose.Schema({
    email:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    otp:{
        type:String,
    }
})

//a function to send mail

async function sendVerificationEmail(email,otp){
    try{ 
        console.log("a");
        const mailResponse=await mailSender(email,"Verification Email From StudyNition ",otp);
        console.log("b");
        console.log("Email sent successfully");
        // res.json({
        //     success:true,
        //     message:"Email sent successfully",
        // })
    } catch(err){
        console.log("Error occured while sending email ");
        console.error(err);
        throw err;
    }
}

otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports=mongoose.model("OTP",otpSchema);

