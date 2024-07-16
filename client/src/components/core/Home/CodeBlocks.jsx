import FTAButton from "../FTAButton";
import {FaArrowRight} from "react-icons/fa";
import {TypeAnimation} from "react-type-animation";
import * as React from "react";

const CodeBlocks = ( {position,heading,subheading,btn1,btn2,Codeblocks,codeColor }) =>{
    return(
        <div className={`  mx-auto lg:flex ${position} my-10 lg:my-20 justify-between gap-10 `}>
          {/* block1 */}
          <div className="flex flex-col gap-8 lg:w-[50%] ">
          <div>{heading}</div>
          <div className=" text-richblack-200 font-bold text-[16px] leading-6 ">{subheading}</div>
          <div className=" flex gap-7 mt-7 ">
            <div>
            <FTAButton toLink={btn1.linkto} active={true} >{btn1.btnText}{" "}<FaArrowRight className=" lg:text-[14px] text-[12px]"/> </FTAButton>
            </div>
            <FTAButton toLink={btn2.linkto}>{btn2.btnText}</FTAButton>
          </div>
          </div>
          {/* block 2 */}
          <div className="h-fit flex  w-[100%] W-[50%] py-4 lg:w-[500px] ">
            {/* HW bg -- */}
            <div className=" flex flex-col text-richblack-200 items-center w-[10%] " >
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            <div className={`W-[90%] ${codeColor} `} >
            <TypeAnimation 
                sequence={[Codeblocks,2000, "" ]}
                repeat={Infinity}
                style={
                    {
                        whiteSpace:"pre-line",
                        display:"block"
                    }
                }
            />
            </div>
          </div>
        </div>
    )
}

export default CodeBlocks;