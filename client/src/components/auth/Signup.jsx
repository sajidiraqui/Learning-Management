
import React from "react";
import Template from "./Template";
import Navbar from "../common/Navbar";
import image from "../../assets/Images/signup.webp";
const Signup = () =>{
    return(
        <div>
            <Template heading={"Join the millions learning to code with StudyNotion for free"} 
            desc1={"Build skills for today, tomorrow, and beyond. "} 
            desc2={"Education to future-proof your career."}
             formType={"signup"}
             image={image} />
        </div>
    )
}
export default Signup;