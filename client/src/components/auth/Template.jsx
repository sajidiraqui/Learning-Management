import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

import * as React from "react";
import {FcGoogle} from "react-icons/fc";
import frame from "../../assets/Images/frame.png"

const Template= ({heading,desc1,desc2,formType,image}) =>{
    return(
        <div>
            {/* w-11/12 */}
            <div className=" w-11/12 lg:max-w-[1160px] mx-auto flex justify-between mt-12 pb-12">
                 {/* section 1 */}
                <div className="flex flex-col max-w-[450px] w-11/12">
                   <div className="text-white text-3xl font-semibold">{heading}</div>
                   <div className="text-richblack-100 text-[18px]">{desc1} 
                   <span className="text-blue-100 italic text-[16px]">{desc2}</span> </div>

                   <div>
                    {
                        formType==='signup' ? (<SignupForm/>) : (<LoginForm/>)
                    }
                   </div>
                   <div className="flex text-richblack-700 items-center mt-4 gap-x-2">
                      <div className="w-full bg-richblack-700 h-[2px]"></div>
                      <div>OR</div>
                      <div className="w-full bg-richblack-700 h-[2px]"></div>
                   </div>
                   <div className="bg-transparent w-full text-richblack-100 flex items-center justify-center 
            gap-x-2 border border-richblack-700 px-2 py-2 mt-6 rounded-md font-semibold"
                   >
                   <FcGoogle/>
                   SignUp with Google</div>
                </div>

                {/* section 2*/}
                <div className=" relative ">
                   <img src={frame}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"/>
                   <img
                    src={image}
                    className=" absolute -top-4 right-4"
                   />
                   
                </div>
            </div>
        </div>
    )
}
export default Template; 