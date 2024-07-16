import React from "react";
import * as Icons from "react-icons/vsc";
import { NavLink, matchPath, useLocation } from "react-router-dom";
const SideBarLink = ({iconName,linkpath,name}) =>{
    const location=useLocation();

    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname);
    }
    const Icon=Icons[iconName];
    return (
        <NavLink to={linkpath}
        className={`relative px-8 py-2 text-sm font-medium ${matchRoute(linkpath) ? "bg-yellow-800 text-yellow-50 ":"bg-opacity-0 text-richblack-300"} 
        transion-all duration-200` }>
            <span className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
          matchRoute(linkpath) ? "opacity-100" : "opacity-0"
        }`}></span>
            <div className=" flex gap-x-2   items-center  ">
                <Icon className="text-lg"/>
                <span>{name}</span>
            </div>
        </NavLink>
    )
}
export default SideBarLink;