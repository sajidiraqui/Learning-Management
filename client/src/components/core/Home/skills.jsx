import React from "react";
import Highlight from "./Highlight";
import FTAButton from "../FTAButton";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timlineImage from "../../../assets/Images/TimelineImage.png"
const data=[
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

const skills = () =>{
    return (
        <div className=" lg:w-10/12 w-11/12 mx-auto lg:mt-20 mt-10 file:">
            <div>
                <div>
                     {
                        data.map((elem,index) => (
                            <div key={index}>
                                <div>
                                    <img src={elem.logo}/>
                                </div>
                                <div>
                                    <p>{elem.heading}</p>
                                    <p> {elem.desc} </p>
                                </div>
                            </div>
                        ))
                     }
                </div>
                <div>
                    <img src={timlineImage}/>
                </div>
            </div>
        </div>
    )
}
export default skills;