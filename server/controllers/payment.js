const { instance } = require("../config/razorpay")
const Course = require("../models/Course")
const crypto = require("crypto")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const {
  courseEnrollmentEmail,
} = require("../mail/courseEnrollmentEmail")
const { paymentSuccessEmail } = require("../mail/paymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress")

// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  const { courses } = req.body
  const userId = req.user.id
  if (courses.length === 0) {
    return res.json({ success: false, message: "Please Provide Course ID" })
  }

  let total_amount = 0

  

  for (const course_id of courses) {
    let course
    try {
      // Find the course by its ID
      course = await Course.findById(course_id)

      // If the course is not found, return an error
      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the Course" })
      }

      // Check if the user is already enrolled in the course
      const uid = new mongoose.Types.ObjectId(userId)
      console.log("here ",uid);
      console.log("course ",course);

      if (course.studentsEnrolled.includes(uid) ) {
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" })
      }

      // Add the price of the course to the total amount
      total_amount += course.price
    } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  }

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options)
    console.log(paymentResponse)
    res.json({
      success: true,
      data: paymentResponse,
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." })
  }
}

// verify the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
  const courses = req.body?.courses

  const userId = req.user.id

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

  if (expectedSignature === razorpay_signature) {
    await enrollStudents(courses, userId, res)
    return res.status(200).json({ success: true, message: "Payment Verified" })
  }

  return res.status(200).json({ success: false, message: "Payment Failed" })
}



// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body

  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}

// enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Course ID and User ID" })
  }

  for (const courseId of courses) {
    try {
      // Find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      )

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" })
      }
      console.log("Updated course: ", enrolledCourse)

      const courseProgress = await CourseProgress.create({
        courseId: courseId,
        userId: userId,
        completedVideos: [],
      })
      // Find the student and add the course to their list of enrolled courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      )

      console.log("Enrolled student: ", enrolledStudent)
      // Send an email notification to the enrolled student
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      )

      console.log("Email sent successfully: ", emailResponse.response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, error: error.message })
    }
  }
}

// const { default: mongoose } = require("mongoose");
// const {instance} =require("../config/razorpay");
// const Course=require("../models/Course");
// const User=require("../models/User");
// const mailsender=require("../utils/mailSender");
// mail ki body import karni hai jo send karni hai

// exports.capturePayment=async (req,res) =>{
//     try{
//         //get courseId and userId 
//         const {courseId}=req.body;
//         const userId=req.user.id;

//         //validation
//         if(!courseId||!userId){
//             return res.status(400).json({
//                 success:false,
//                 message:"Data missing "
//             })
//         }

//         //validation course
//         const course= await Course.findById({courseId});
//         if(!course){
//             return res.status(400).json({
//                 success:false,
//                 message:"course not found "
//             });
//         }

//         //check user already pay for this course ?
//         const uid= new mongoose.Types.ObjectId(userId);
//         if(course.studentEnrolled.includes(uid)){
//             return res.status(400).json({
//                 success:false,
//                 message:"User is alredy enrolled "
//             });
//         }

//         // create order
//         const amount=course.price;
//         const currency="INR";

//         const options={
//             amount:amount*100,
//             currency,
//             receipt:Math.random(Date.now()).toString(),
//             notes:{
//                 courseId,
//                 userId
//             }
//         }
//         try{
//             //initiate payment using razorpay 
//             const paymentResponse=await instance.orders.create(options);
//             console.log(paymentResponse);
//         }
//         catch(error){
//             res.status(500).json({
//                 success:false,
//                 message:error.message
//             })
//         }

//         //return res
//         res.status(200).json({
//             success:true,
//             message:"order created successfully",
//             courseName:course.courseName,
//             description:course.description,
//             thumbnail:course.thumbnail,
//             orderId:paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount
//         });

//     } catch(error){
//         res.status(500).json({
//             success:false,
//             message:error.message
//         });
//     }
// }

// //verify siganture of razorpay and server
// exports.verifySignature = async (req,res) => {
//     try{
//         const webhookSecret="12345678";
//         const signature=req.headers("x-razorpay-signature");  //hashed signature

//         //hash webhookSecret
//         const shasum=crypto.createHmac("sha256",webhookSecret);

//         shasum.update(json.stringify(req.body));

//         const digest=shasum.digest("hex");

//         //match digest and signature

//         if(signature===digest){
//             console.log("payment authrized");

//             //fecth data feom notes
//             const {userId,courseId}=req.body.payload.payment.entity.notes;

//             //preform action
//             try{
//                 //find course and enroll the student
//                 const course= await Course.findByIdAndUpdate({courseId},{$push:{studentEnrolled:userId}},{new:true});

//                 //find the student and add course in list of course
//                 const user=await User.findByIdAndUpdate({userId},{$push:{courses:courseId}},{new:true});

//                 //send email of confirmation
//                 const emailResponse=await mailSender(user.email,"congartulations, from Codehelp ",
//                 "congratulations, you are enrolled in new codehelp course ");

//                 console.log(emailResponse);

//                 return res.status(200).json({
//                     success:true,
//                     message:"students enroolled successfully "
//                 });
//             }
//             catch(error){
//                 res.status(500).json({
//                     success:false,
//                     message:error.message
//                 });
//             }
//         }
//     } catch(error){
//         res.status(500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }

