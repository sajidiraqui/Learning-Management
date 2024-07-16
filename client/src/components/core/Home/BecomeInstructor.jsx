import { FaArrowRight } from "react-icons/fa"
import * as React from "react";
import FTAButton from "../FTAButton"
import instructorImg from "../../../assets/Images/Instructor.png";
import Highlight from "./Highlight";

const BecomeInstructor=()=>{
    return(
        <div className=" w-11/12 lg:w-9/12 mx-auto flex gap-20 flex-col lg:flex-row-reverse justify-between py-20 ">
            <div className=" lg:w-[40%]  flex flex-col lg:gap-y-8 gap-4 lg:py-24 items-start ">
                <div className=" lg:text-4xl text-3xl text-richblack-5 font-bold ">Become an  <br/>
                <Highlight text={" instructor"}/></div>
                <p className=" text-richblack-300">Instructors from around the world teach millions of students on StudyNotion.
                 We provide the tools and skills to teach what you love.</p>
                 <div className=" mt-10">
                 <FTAButton active={true} 
                >Start Teaching Today <FaArrowRight/> </FTAButton>
                 </div>
            </div>
            <div className=" relative lg:max-w-[60%]">
                 <div className=" absolute h-[500px] top-0 left-0 bg-white "></div>
                <img src={instructorImg} className=" object-cover h-fit"/>
            </div>
        </div>
    )
}
export default BecomeInstructor;