import React from "react";
import ContactForm from "./ContactForm";

const ContactUsFormSection =()=>{
    return(
        <div>
           <h1 className=" lg:text-4xl text-3xl text-richblack-5 ">
             Got a Idea? We’ve got the skills. Let’s team up
           </h1>
           <p className=" text-richblack-300 " >
           Tall us more about yourself and what you’re got in mind.</p>
           <ContactForm/>
        </div>
    )
}

export default ContactUsFormSection;