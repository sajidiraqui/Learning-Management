import FTAButton from "../FTAButton";
import * as React from 'react'
import { FaArrowRight } from "react-icons/fa";
import Highlight from "./Highlight";
import { HomePageExplore } from "../../../data/homepage-explore";
import { useState } from "react";
import {FiUsers} from "react-icons/fi";
import {HiUsers} from "react-icons/hi";

const tabsName=[
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths",
];

const PowerOfCodeSection = () =>{
     
    const [currTab,setCurrTab]=useState(tabsName[0]);
    const [courses,setCourses]=useState(HomePageExplore[0].courses);
    const [currCard,setCurrCard]=useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) =>{
        setCurrTab(value);
        const result = HomePageExplore.filter((element)=>{
            return element.tag===value;
        })
        setCourses(result[0].courses);
        setCurrCard(result[0].courses[0].heading);
    }


    return(
        <div className=" relative  ">
        <div className=" relative w-11/12 lg:w-10/12 mx-auto flex items-center   flex-col gap-y-10 lg:pb-[220px] pb-[900px] ">
            <div className=" flex flex-col lg:items-center gap-y-2 items-start">
            <div className=" lg:text-4xl font-bold text-3xl text-richblack-5 " >Unlock the <Highlight text={"Power of Code"} /> </div>
            <div className=" text-richblack-300 ">Learn to Build Anything You Can Imagine</div>
            </div>
            <div className=" flex  gap-x-5 lg:text-[16px] text-xs p-1 bg-richblack-700 rounded-full ">
                 {
                    tabsName.map( (tab,index)=>(
                        <div key={index} className={` ${currTab===tab ? ("bg-richblack-800 text-richblack-5"):("text-richblack-300")} " lg:py-2 lg:px-4 rounded-full  "`}
                        onClick={()=>setMyCards(tab)}>
                            <p>{tab}</p>
                        </div>
                    ))
                 }
            </div>
            <div className=" lg:w-[90%] flex lg:flex-row flex-col gap-10 lg:px-10 absolute lg:-bottom-[30%] -bottom-[10%] ">
                {
                    courses.map( (course,index)=>(
                        <div key={index} className={` ${currCard==course.heading ? ("bg-richblack-5 ")
                        :("bg-richblack-700 text-richblack-300")} lg:w-[30%]   px-6 pt-10 flex flex-col gap-y-14 justify-between`}>
                            <div className=" flex flex-col gap-y-4">
                                 <div className=" text-xl font-bold  ">{course.heading}</div>
                                 <div>{course.description}</div>
                            </div>
                            <div className=" p-3 flex justify-between border-t-2 border-t-black ">
                                <div className="flex items-center gap-x-2">
                                    <HiUsers className=" w-[24px]"/>
                                    <p>{course.level}</p>
                                </div>
                                <div className=" flex items-center ">
                                    <p>{course.lessionNumber} </p>
                                    <p>Lessons</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className="bgimage bg-richblack-5 h-[320px]  ">
            <div className="h-[20%]"></div>
            <div className=" lg:w-11/12 mx-auto flex justify-center items-center  h-[80%] gap-7 ">
                <FTAButton active={true}>Explore Full Catalog  <FaArrowRight/> </FTAButton>
                <FTAButton active={false}>Learn More</FTAButton>
            </div>
        </div>

        </div>
    )
}
export default PowerOfCodeSection;