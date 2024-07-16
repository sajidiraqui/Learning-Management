import { useState } from "react"
import * as React from "react";
import {BiShow,BiHide} from "react-icons/bi"
import countryCode from "../../data/countrycode.json";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../slices/authSlice";
import { otpSend } from "../../services/operations/authAPI";
import { toast } from "react-hot-toast";

const SignupForm =()=>{

    console.log("a");

    
     const navigate=useNavigate();
     const dispatch=useDispatch();

    const [accountType,setAccountType]=useState("student");
    const [formData,setFormData]=useState({firstName:"",lastName:"",email:"",password:"",
    confirmPassword:""});

    const [showPassword,setShowPassword]=useState(false);

    const[showConfirmPassword,setConfirmPassword]=useState(false);

    function changeHandler (event){
        console.log(firstName);
        setFormData( prev=> {
          return{  ...prev,
            [event.target.name]:event.target.value
         }

        })
    }

    //console.log("b");
    const { firstName , lastName ,email ,password,confirmPassword}=formData; 

    const handleOnSubmit = (e) => {
        
      e.preventDefault()
        if(password !== confirmPassword){
           toast.error("Password not matched ");
           return;
        }

        const signupData={
            ...formData,
            accountType
        }

      //   Setting signup data to state
      //  To be used after otp verification
       dispatch(setSignupData(signupData));

       //send otp for email verification 
       dispatch(otpSend(formData.email,navigate));
       setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })

      setAccountType("student");
   }
    return (
        <div>
           <div className=" text-richblack-100 bg-richblack-700 px-1 p-1 max-w-max
            gap-2 rounded-full flex gap-x-1 mt-6"  >
                <button onClick={()=>{setAccountType('student')}} className={` ${accountType === "student" ? "bg-richblack-900 text-richblack-5 px-5 py-2 rounded-full" :
                "bg-transparent text-richblack-200 px-5 py-2" }`} >Student</button>
                <button className={` ${accountType === "student" ? "bg-transparent text-richblack-200 px-5 py-2" :
                "bg-richblack-900 text-richblack-5 px-5 py-2 rounded-full" }`  } 
                onClick={()=>{setAccountType("instructor")}}>Instructor</button>
            </div>
            <form onSubmit={handleOnSubmit}>
                 {/* firstName LastName */}
                <div className=" flex justify-between ">
                 <label>
               <p className=" text-white text-[14px] mt-4 ">First Name<sup className="text-pink-200 ">*</sup></p>
                <input type="text" 
                required
                    placeholder="Enter First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={changeHandler}
                    className="  bg-richblack-800 py-3 px-3 rounded-md mt-1  w-full text-richblack-5 "    
                    />
               </label>
               <label>
               <p className=" text-white text-[14px] mt-4 ">LastName<sup className="text-pink-200 ">*</sup></p>
                <input type="text" 
                required
                    placeholder="Enter Last name "
                    name="lastName"
                    value={formData.lastName}
                    onChange={changeHandler}
                    className="  bg-richblack-800 py-3 px-3 rounded-md mt-1  w-full text-richblack-5 "    
                    />
               </label>
                </div>

                <div>
                <label>
               <p className=" text-white text-[14px] mt-4 ">Email Address<sup className="text-pink-200 ">*</sup></p>
                <input type="email" 
                required
                    placeholder="Enter email address"
                    name="email"
                    value={formData.email}
                    onChange={changeHandler}
                    className="  bg-richblack-800 py-3 px-3 rounded-md mt-1  w-full text-richblack-5 "    
                    />
               </label>
                </div>

                {/* password and confirm password  */}
               <div className=" flex justify-between ">
               <label className=" relative ">
               <p className=" text-white text-[14px] mt-4 ">Password<sup className=" text-pink-200 ">*</sup></p>
                <input type={showPassword ? "text" : "password"}
                   required
                   placeholder="Enter Password"
                    name="password" 
                    value={formData.password}
                    onChange={changeHandler} 
                    className="bg-richblack-800 py-3 px-3 rounded-md mt-1  w-full text-richblack-5"   
                    />
                    <span onClick={()=>(setShowPassword(!showPassword))}
                    className=" absolute top-0absolute  right-3 top-[55px] cursor-pointer ">
                        {
                            showPassword ? (<BiHide fill='#AFB2BF' fontSize={24}/>) : (<BiShow fill='#AFB2BF' fontSize={24}/>)
                        }
                    </span>
               </label>
               <label className=" relative ">
               <p className=" text-white text-[14px] mt-4 ">Confirm Password<sup className=" text-pink-200 ">*</sup></p>
                <input type={showConfirmPassword ? "text" : "password"}
                   required
                   placeholder="Enter Password"
                    name="confirmPassword" 
                    value={formData.confirmPassword}
                    onChange={changeHandler} 
                    className="bg-richblack-800 py-3 px-3 rounded-md mt-1  w-full text-richblack-5"   
                    />
                    <span onClick={()=>(setConfirmPassword(!showConfirmPassword))}
                    className=" absolute top-0absolute  right-3 top-[55px] cursor-pointer ">
                        {
                            showConfirmPassword ? (<BiHide fill='#AFB2BF' fontSize={24}/>) : (<BiShow fill='#AFB2BF' fontSize={24}/>)
                        }
                    </span>
               </label>
               </div>
               {/* button */}
               <button className=" w-full max-auto bg-yellow-50 py-2 rounded-md mt-10 text-richblack-900
            font-semibold "
              >
                 Create Account
               </button>
            </form>
        </div>
    )
}

export default SignupForm;