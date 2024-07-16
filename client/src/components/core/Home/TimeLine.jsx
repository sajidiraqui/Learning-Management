import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timlineImage from "../../../assets/Images/TimelineImage.png"
const Timeline=[
    {
        logo:Logo1,
        heading:"Leadership",
        desc:"Fully committed to the success company",
    },
    {
        logo:Logo2,
        heading:"Responsibility",
        desc:"Students will always be our top priority",
    },
    {
        logo:Logo3,
        heading:"Flexibility",
        desc:"The ability to switch is an important skills",
    },
    {
        logo:Logo4,
        heading:"Solve the problem",
        desc:"Code your way to a solution",
    }
]

const TimeLine = () =>{
    return (
        <div className=" lg:w-10/12 w-11/12 mx-auto lg:my-20 pb-20 ">
            <div className=" w-full lg:flex justify-between">
                <div className=" lg:w-[30%] flex flex-col gap-14 py-16 ">
                     {
                        Timeline.map((data,index) => (
                            <div key={index} className=" flex items-center gap-10 ">
                                <div className=" bg-white rounded-full w-[40px] h-[40px] flex justify-center items-center ">
                                    <img src={data.logo}/>
                                </div>
                                <div className=" flex flex-col ">
                                    <p className=" font-bold text-[20px]">{data.heading}</p>
                                    <p> {data.desc} </p>
                                </div>
                            </div>
                        ))
                     }
                </div>
                <div className=" relative lg:w-[60%] w-full h-full  ">
                    <div className=" absolute  mb-5 mr-5 flex lg:flex-row flex-col gap-y-14
                     bg-caribbeangreen-700 py-10 uppercase justify-center items-center 
                     lg:-bottom-20 lg:left-[20%] left-[30%] ">
                        <div className=" flex gap-5 items-center lg:px-14 px-7 lg:border-r border-caribbeangreen-300 ">
                            <p className=" text-3xl font-bold text-white">10</p>
                            <p className=" text-sm text-caribbeangreen-300 max-w-[80px]">Years experiences</p>
                        </div>
                        {/* <div className="h-[40px] w-[1px] bg-caribbeangreen-400 ml-7"></div> */}
                        <div className=" flex gap-5 px-7 items-center ">
                            <p className="text-3xl font-bold text-white">250</p>
                            <p className=" text-sm text-caribbeangreen-300 max-w-[80px]">Types of Courses</p>
                        </div>
                    </div> 
                    <img src={timlineImage} alt="timeline image" className="h-fit object-cover w-full"/>
                </div>
            </div>
        </div>
    )
}
export default TimeLine;