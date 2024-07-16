import React from "react";
import ContactForm from "../Contact/ContactForm";

const ConatactFormSection = () =>{
    return(
        <div className=" flex flex-col items-center gap-y-5 lg:mt-20 pt-20 my-5  "> 
            <h1 className=" lg:text-4xl text-3xl font-bold text-richblack-5">Get in Touch</h1>
            <p className=" text-richblack-300 lg:text-[16px] text-sm">We'd love to here for you, Please fill out this from.</p>
            <ContactForm/>
        </div>
    )
}
export default ConatactFormSection;