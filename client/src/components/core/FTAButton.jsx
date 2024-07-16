import React from "react";
import { Link } from "react-router-dom";

const FTAButton = ({children ,active,toLink}) =>{
    return(
        <Link to={toLink}>
        <div className={` px-6 lg:text-[16px] text-[14px] leading-6 py-3 rounded-lg font-bold  hover:scale-95 transition-all duration-200
         ${  active ? "bg-yellow-50 text-richblack-800 " : " bg-richblack-700 text-richblack-200"} max-w-maxContent flex justify-center items-center `}>
            {children}
        </div>
        </Link>
    )
}

export default FTAButton;