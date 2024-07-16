import React from "react";
import Highlight from "../Home/Highlight";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { BiSolidQuoteAltRight } from "react-icons/bi";
const Quote =()=>{
    return(
        // <div className=" text-richblack-5 md:text-4xl text-xl font-semibold text-center lg:w-[65%] mx-auto py-16">
        //   <span></span>  
        //     <div> <span className=""></span>We are passionate about revolutionizing the way we learn. Our innovative platform<Highlight text={" combines technology"}/>,<span className=" text-brown-400 ">expertise</span> 
        // and community to create an
        // {" "} <span className=" text-brown-500  " >unparalleled educational expertise</span> 
        // </div>
        // </div>

        <div className=" text-xl md:text-4xl font-semibold mx-auto lg:py-20 py-5 text-center text-white lg:w-[80%]">
        We are passionate about revolutionizing the way we learn. Our
        innovative platform <Highlight text={"combines technology"} />,{" "}
        <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
            {" "}
            expertise
        </span>
        , and community to create an
        <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
            {" "}
            unparalleled educational
        experience.
        </span> 
    </div>
    )
}
export default Quote;