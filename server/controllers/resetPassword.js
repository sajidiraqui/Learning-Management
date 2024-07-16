const User = require("../models/User");
const mailSender=require("../utils/mailSender");
const bcrypt=require("bcrypt");
const crypto=require("crypto");

//resetPassword Token
exports.resetPasswordToken=async (req,res)=>{
    try{
        //fetch email
        const {email}=req.body;
        console.log(email);
        //check user for this email
        const user=await User.findOne({email:email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User are not registered"
            })
        }

        //generate token
        const token= crypto.randomUUID();

        //upadte user by adding token
        const updateDetails=await User.findOneAndUpdate({email:email},
            {token:token,TokenExpireIn:Date.now()+5*60*1000},{new:true});
        console.log("c");    
        //create url
        const url=`http://localhost:5173/update-password/${token}`;
        //send mail containig url
        await mailSender(email,"Password Reset link : ",`password reset link : ${url}`);
        //return res
        console.log("d");
        res.status(200).json({
            success:true,
            message:"Email send successfully "
        })
    } catch(err){
        res.status(500).json({
            success:false,
            message:"Error in sending email to reset password link "
        })
    }
}

//resetPasseord
exports.resetPassword=async (req,res)=>{
    try{
        //fetch data from req body
        const{password,confirmPassword,token}=req.body;
        console.log(password);
        console.log(confirmPassword);
        console.log(token);
        //validation
        if(password!==confirmPassword){
            return res.status(401).json({
                success:false,
                message:"password not match please fill in correct way "
            })
        }
        //get userDetails using token
        const userDetails=await User.findOne({token:token});
        console.log(userDetails);
        //if no entry inavlid token return res
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"Invalid token"
            })
        }
        //token time
        if(userDetails.TokenExpireIn < Date.now()){
            console.log("Token expires")
            return res.status(400).json({
                success:false,
                message:"Token is expired, please regenerate your token "
            })
        }
        //hash password
        console.log("b");
        const hassPassword=await bcrypt.hash(password,10);
        //upadate entry in db
        await User.findOneAndUpdate({token:token},{password:hassPassword},{new:true});
        //return res
        res.status(200).json({
            success:true,
            message:"Password reset succssfuly "
        })
    } catch(err){
        res.status(500).json({
            success:false,
            message:"Error occur in pasword reset ",
            message:err.message
        })
    }
}