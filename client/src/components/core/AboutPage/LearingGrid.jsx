import React from "react";
import Highlight from "../Home/Highlight";
import { Link } from "react-router-dom";
import FTAButton from "../../core/FTAButton";

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highliteText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating " Auto-grading " `,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];

const LearnigGrid=()=>{
    return (<div className=" grid lg:grid-cols-4  md:grid-cols-2  grid-cols-1 lg:w-10/12 w-11/12 mx-auto lg:my-20   ">
          {
            LearningGridArray.map( (card,i)=>
            (
                <div className={`${i===0&&"col-span-2 xl:h-[294px]"} 
                ${card.order%2==1 ? "bg-richblack-700 xl:h-[294px] ":card.order%2==0 ? 
                "bg-richblack-800 h-[294px] " : " bg-transparent "} ${card.order===3 && "xl:col-start-2 "}  `}>
                    {
                        card.order<0 ?
                        (<div className=" flex flex-col gap-5 p-5 items-start w-[90%] h-[294px] ">
                            <h1 className=" lg:text-4xl md:text-3xl text-2xl   font-bold text-richblack-5 ">{card.heading}{" "}<Highlight text={card.highliteText} /></h1>
                            <p className=" text-richblack-300 lg:text-[16px] text-sm ">{card.description}</p>

                            <div className=" mt-2">
                              <FTAButton active={true} toLink={card.BtnLink}>
                                  {card.BtnText}
                              </FTAButton>
                            </div>
                        </div>) :
                        (<div className=" flex flex-col lg:p-8 p-4 lg:w-[90%] gap-8 h-[294px] ">
                          <h1 className=" text-lg font-bold text-richblack-5 text-start lg:w-[90%] ">{card.heading}</h1>
                          <p className=" text-richblack-300 font-medium">{card.description}</p>
                        </div>)
                    }
                </div>
            ))
          }
    </div>)
}
export default LearnigGrid;