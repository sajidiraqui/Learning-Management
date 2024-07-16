import React from "react";
import Navbar from "../components/common/Navbar";
import ContactDetails from "../components/core/Contact/ContactDetails";
import ContactUsFormSection from "../components/core/Contact/ContactusFormSection";
import Footer from "../components/common/Footer";


const Contact = () =>{
    return(
        <div>
            <div className=" flex lg:flex-row flex-col  lg:w-10/12 w-11/12 mx-auto my-20 gap-20 ">
                <div className=" lg:w-[40%] text-richblack-300 ">
                    <ContactDetails/>
                </div>
                <div className=" lg:w-[50%] lg:p-10 border border-richblack-700 ">
                    <ContactUsFormSection/>
                </div>
            </div>

            {/* Review slider */}
            <Footer/>
        </div>
    )
}
export default Contact;