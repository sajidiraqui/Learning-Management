const express=require("express");
const app=express();

const userRoutes=require("./routes/User");
const profileRoutes=require("./routes/profile");
const courseRoutes=require("./routes/Course");
const contactUsRoute=require("./routes/Contact");
const paymentRoutes=require("./routes/payment");

const cors = require("cors");
const database=require("./config/database");
const cookieParser=require("cookie-parser");
const cloudinaryConnect=require("./config/cloudinary");
const fileUpload=require("express-fileupload");
const dotenv=require("dotenv");

dotenv.config();
const PORT =process.env.PORT ||3001

//database connection
database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:["http://localhost:3000","http://localhost:5173"],
        credential:true
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

//clodinary connection
cloudinaryConnect.cloudinaryConnect()

//routes mount
app.use("/api/v1/auth",userRoutes);
app.use('/api/v1/profile',profileRoutes);
app.use('/api/v1/course',courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
//app.use('/api/v1/reach',contactUsRoute);
//default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running...."
    })
})

//activate the server
app.listen(PORT,()=>{
    console.log(`App is running at ${PORT} `);
});