import React from "react";
import Highlight from "./Highlight";
import knowYourProgress from "../../../assets/Images/Know_your_progress.png";
import compareWithOthers from "../../../assets/Images/Compare_with_others.png";
import planYourLessons from "../../../assets/Images/Plan_your_lessons.png";
import FTAButton from "../FTAButton";

const LearnLangSection = () =>{
    return(
        <div className=" mt-14 flex flex-col gap-7 bg-richblack-5 ">
           <div className=" w-10/12 mx-auto gap-y-3 flex flex-col justify-center items-center ">
              <p className=" lg:text-4xl text-3xl lg:font-bold font-semibold   ">Your swiss knife for <Highlight text={"learning any language"} /> </p> 
              <p className="lg:w-[60%] lg:text-center lg:px-10 lg:text-[16px] text-sm  ">Using spin making learning multiple languages easy. with 20+ 
              languages realistic voice-over, progress tracking, custom schedule 
              and more.</p>
           </div>
           <div className="  flex lg:w-9/12 mx-auto lg:relative lg:h-[550px] flex-col h-fit">
              <img src={knowYourProgress} className=" lg:absolute left-0 top-10"/>
              <img src={compareWithOthers} className=" lg:absolute left-[25%]  "/>
              <img src={planYourLessons} className=" lg:absolute right-0  "/>
           </div>
           <div className=" w-10/12 mx-auto flex justify-center items-center pb-10">
               <FTAButton active={true} >Learn More</FTAButton>
           </div>
        </div>
    )
}
export default LearnLangSection;