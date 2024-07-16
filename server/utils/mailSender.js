
const nodemailer=require("nodemailer");

require("dotenv").config();
const mailSender=async(email,title,body)=>{
    try{
        console.log("a");
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })
        let info=await transporter.sendMail({
            from:'StudyNotion',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
        console.log("Inofrmation about mail sending : ", info);
        return info;
    } catch(err){
        console.log(err.message);
        // resizeBy.json({
        //     success:false,
        //     message:"Error in mail sending",
        // })
    }
}

module.exports=mailSender;