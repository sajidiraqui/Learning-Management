
import React  from "react";
import Template from "./Template";
import Navbar from "../common/Navbar";
import image from "../../assets/Images/login.webp";

const Login = () =>{
    return (
        <div className=" ">
            <Template heading={"Welcome"} 
            desc1={"Build skills for today, tomorrow, and beyond."} 
            desc2={"Education to future-proof your career."} 
            formType={"login"}
                image={image}
            />
        </div>
    )
}

export default Login;