const User =require("../models/User");
const OTP=require("../models/OTP");
const otpgenerateor=require("otp-generator")
const bcrypt=require("bcrypt");
const Profile=require("../models/Profile");
const jwt=require("jsonwebtoken");
const mailSender=require("../utils/mailSender");
require("dotenv").config();
//send otp
exports.sendOTP=async (req,res)=>{
    try{
        //data fetch 
        const {email}=req.body;

        const userExist=await User.findOne({email});
        //check user already exist or not
        if(userExist){
            console.log("User already registred ");
            return res.status(401).json({
                success:false,
                message:"User already registered",
            })
        }
        //otp generate
        console.log("abcdef");
        var otp=otpgenerateor.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log(" generated : ",otp);

        //check unique otp 
        //bht ghatiya method hai
        var result =await OTP.findOne({otp:otp});
        while(result){
            otp=otpgenerateor.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                SpecialChars:false,
            });
            result =await OTP.findOne({otp:otp});
        }

        //create entry in db
        const otpPayload={
            email,otp
        }
        const otpBody=await OTP.create(otpPayload);
        console.log(otpBody);

        //return res
        res.status(200).json({
            success:true,
            message:"Otp send successfully "
        })
    } catch(err){
        console.log("Error occurred in otp generation ");
        res.json({
            success:false,
            message:"Error occured in otp generation ",
        })
    }
}


//signup

exports.SignUp = async (req ,res) => {
    try{
        //fetch data
        const 
        {firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        otp
        }=req.body;
        // validation of data
        if(!firstName||!lastName||!email||!password||!confirmPassword||!accountType||!otp){
                return res.status(401).json({
                    success:false,
                    message:"All fill are required " 
                })
            }

        //user is already registered
        const userExist=await User.findOne({email});
        if(userExist){
            return res.status(401).json({
                success:false,
                message:"User already registered ",
            })
        }
        //match two password 
        if(password!==confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Password not matched "
            })
        }
        //find most recent otp stored for user
        const recentOTP=await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
        console.log("recent otp",recentOTP);
        //validate otp
        if(otp.length==0){
            return res.status(400).json({
                success:false,
                message:"OTP not found"
            })
        }
        if( otp !== recentOTP[0].otp){
            return res.status(401).json({
                success:false,
                message:"Invalid otp ",
            })
        }
        //hash pass
        const hassPassword=await bcrypt.hash(password,10);
        //create entry in db
        const profileDeatils=await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        });
        const user=await User.create({
            firstName,
            lastName,
            password:hassPassword,
            email,
            contactNumber:null,
            accountType,
            additionalDetails:profileDeatils,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })
        console.log("d");
        //return res
        res.status(200).json({
            user:user,
            success:true,
            message:"User registered successfully "
        })
    } catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
//login

exports.Login=async(req,res)=>{
    try{
        //fetch data
        console.log("a");
        const {email, password}=req.body;
        //validate data
        if(!email||!password){
            return res.status(401).json({
                success:false,
                message:"Please fill all fields",
            })
        }
        //check user is already exist or not
        console.log("b");
        let user=await User.findOne({email}).populate("additionalDetails").exec();
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User is not registered, please.... "
            })
        }

        //password matching
        console.log("c");
        if(await bcrypt.compare(password,user.password))
        {
            //create token 
            console.log("d");
            const payload={
            email:user.email,
            id:user._id,
            accountType:user.accountType
            }
            let token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h",});
            //confusion
            console.log(token);
            user=user.toObject();
            user.token=token;
            user.password=undefined;
            
            //cokiees creation
            const options={
                expires:new Date (Date.now()+3*24*60*60*1000),
                httpOnly:true
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User loggedIn successfully"
            })
        }
        else
        {
            return res.status(401).json({
                success:false,
                message:"Password is incorrect ",
            })
        }
    } catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error occur when user try to loggin"
        })
    }
}
//ChangePassword


//HW



//change password
exports.changePassword=async(req,res)=>{
    try{
        // Get user data from req.user
        console.log("Start");
		const userDetails = await User.findById(req.user.id);

        console.log("userDetails",userDetails);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

        console.log("OldPassword",oldPassword);
        console.log("new Password",newPassword);

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
        console.log("b");
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}
        console.log("d");
		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}
        console.log("e");
		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);
        console.log("f");
		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
                "Password for your account has been updated",
                `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				// {
                //     success:"Password for your account has been updated",
				// 	email:updatedUserDetails.email,
				// 	title:`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                // }
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
    } catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}