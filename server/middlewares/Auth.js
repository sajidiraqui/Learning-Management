//cookiePArser
const jwt=require("jsonwebtoken");
require("dotenv").config();
//auth
exports.auth=async (req,res,next)=>{
    try{
        //token fetch
        console.log("start")
        const token=req.cookies.token||req.body.token||req.header("Authorisation").replace("Bearer ","");
        console.log("token",token);
        //validity
        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token is invalid"
            })
        }
        //verifay token
        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET); 
            console.log("decode",decode);  

            //store token in req.user after verify 
            req.user=decode;

        } catch(err){
            return res.status(400).json({
                success:false,
                message:"token is invalid"
            })
        }

        // res.status(200).json({
        //     success:true,
        //     message:"User is authenticated successfully "
        // })

        next();

    } catch(err){
        res.status(500).json({
            success:false,
            message:"Something wrong in user authentication ",
        })
    }
}
//isStudent

exports.isStudent=async (req,res,next)=>{
    try{
        if(req.user.accountType!=='student'){
            return res.status(400).json({
                success:false,
                message:"This is protected route for students ",
            })
        }
        next();
    } catch(err){
        res.status(500).json({
            success:false,
            message:"user role is not matching "
        })
    }
}


//isInstructer
exports.isInstructor=async (req,res,next)=>{
    try{
        console.log("type",req.user.accountType);
        if(req.user.accountType!=='instructor'){
            return res.status(400).json({
                success:false,
                message:"This is protected route for instructor ",
            })
        }
        next();
    } catch(err){
        res.status(500).json({
            success:false,
            message:"user role is not matching "
        })
    }
}


//isAdmin
exports.isAdmin=async (req,res,next)=>{
    try{
        if(req.user.accountType!=='admin'){
            return res.status(400).json({
                success:false,
                message:"This is protected route for admin ",
            })
        }
        next();
    } catch(err){
        res.status(500).json({
            success:false,
            message:"user role is not matching "
        })
    }
}