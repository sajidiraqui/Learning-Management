const mongoose =require("mongoose");
require("dotenv").config();

exports.connect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then( ()=>{console.log("db connection succesfully ")})
    .catch((err)=>{
        console.log("Error in db connection ");
        console.error(err);
        process.exit(1);
    })
}