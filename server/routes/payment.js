// // Import the required modules
// const express = require("express")
// const router = express.Router()

// const { capturePayment, verifySignature } = require("../controllers/Payments")
// const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")
// router.post("/capturePayment", auth, isStudent, capturePayment)
// router.post("/verifySignature", verifySignature)

// module.exports = router;

// Import the required modules
const {isStudent,isAdmin, auth, isInstructor} =require("../middlewares/Auth") 
const express = require("express")
const router = express.Router()
const {capturePayment,verifyPayment,sendPaymentSuccessEmail}=require("../controllers/payment")

router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifyPayment", auth, isStudent, verifyPayment)
router.post(
  "/sendPaymentSuccessEmail",
  auth,
  isStudent,
  sendPaymentSuccessEmail
)
// router.post("/verifySignature", verifySignature)

module.exports = router
