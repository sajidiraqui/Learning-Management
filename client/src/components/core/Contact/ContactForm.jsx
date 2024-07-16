import React from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../../data/countrycode.json";
import FTAButton from "../FTAButton";
import { useState,useEffect } from "react";

const ContactForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const[loading,setLoading]=useState(false);
  const submitHandler= async (data)=>{
    try{
        console.log(data);
        setLoading(true);
        //api call
        setLoading(false);

    }
    catch(err){
        console.log("Error message : ",err.message);
        setLoading(false);
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])
  return (
    <form className=" flex flex-col gap-5 my-10"
    onSubmit={handleSubmit(submitHandler)}>
      <div className=" flex flex-col lg:flex-row gap-5 ">
        {/* first name */}
        <div className=" flex flex-col gap-2 lg:w-[48%] ">
          <label htmlFor="firstName" className="text-richblack-5">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter first name"
            {...register("firstName", { required: true })}
            className="bg-richblack-700 py-3 px-3 rounded-md mt-1  w-full text-richblack-5"
          />
          {errors.firstName && <span className=" text-yellow-50 ">please enter first name</span>}
        </div>
        {/* lastName */}
        <div className=" flex flex-col gap-2 lg:w-[48%] ">
          <label htmlFor="lastName" className="text-richblack-5">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter last name"
            {...register("lastName")}
            className="form-style bg-richblack-700 py-3 px-3 rounded-md mt-1  w-full text-richblack-5"
          />
        </div>
      </div>
      <div className=" flex flex-col">
        <label htmlFor="email" className="text-richblack-5">
          Email Address
        </label>
        <input
          type=" email"
          name="email"
          id="email"
          placeholder="Enter eamil address"
          className=" form-style bg-richblack-700 py-3 px-3 rounded-md mt-1  w-full text-richblack-5 "
          {...register("email", { required: true })}
        />
        {errors.email && <span className="text-yellow-50">please enter correct email id</span>}
      </div>
      <div className=" flex flex-col ">
        <label htmlFor="countryCode" className=" text-richblack-5">
          Phone Number
        </label>
        <div className=" flex justify-between  ">
          <select
            name="countryCode"
            id="countryCode"
            {...register("countryCode", { required: true })}
            className=" w-[15%] bg-richblack-700 py-3 px-3 rounded-md mt-1   text-richblack-5 lg:text-[16px] text-xs "
          >
            {CountryCode.map((ele, index) => (
              <option key={index}>
                {ele.code}-{ele.country}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="phoneNo"
            id="phoneNo"
            placeholder="12345 67891"
            className="bg-richblack-700 py-3 px-3 rounded-md mt-1  w-[80%] text-richblack-5"
            {...register("phoneNo", {
              required: {
                value: true,
                message: "Please enter your Phone Number.",
              },
              maxLength: { value: 12, message: "Invalid Phone Number" },
              minLength: { value: 10, message: "Invalid Phone Number" },
            })}
          />
        </div>
        {
          errors.phoneNo&& <span className=" text-yellow-50">{errors.phoneNo.message}</span>
        }
      </div>
      <div className=" flex flex-col ">
        <label className=" text-richblack-5">Message</label>
        <textarea
          name="message"
          id="message"
          placeholder="Enter your message here"
          rows={5}
          cols={20}
          className="bg-richblack-700 py-3 px-3 rounded-md mt-1  w-full text-richblack-5"
          {...register("message", {
            required: { value: true, message: "please enter message " },
          })}
        />
        {
          errors.message&& (<span className=" text-yellow-50">{errors.message.message}</span>)
        }
      </div>
      {/* <button className=" my-5 " type="submit">
          <FTAButton active={true} >Send Message</FTAButton>
      </button> */}
      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;



// import React, { useEffect, useState } from "react"
// import { useForm } from "react-hook-form"

// import CountryCode from "../../../data/countrycode.json"

// const ContactUsForm = () => {
//   const [loading, setLoading] = useState(false)
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitSuccessful },
//   } = useForm()

//   const submitContactForm = async (data) => {
//     console.log("Form Data - ", data)
//     try {
//       setLoading(true)
//     //   const res = await apiConnector(
//     //     "POST",
//     //     contactusEndpoint.CONTACT_US_API,
//     //     data
//     //   )
//       // console.log("Email Res - ", res)
//       setLoading(false)
//     } catch (error) {
//       console.log("ERROR MESSAGE - ", error.message)
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     if (isSubmitSuccessful) {
//       reset({
//         email: "",
//         firstname: "",
//         lastname: "",
//         message: "",
//         phoneNo: "",
//       })
//     }
//   }, [reset, isSubmitSuccessful])

//   return (
//     <form
//       className="flex flex-col gap-7"
//       onSubmit={handleSubmit(submitContactForm)}
//     >
//       <div className="flex flex-col gap-5 lg:flex-row">
//         <div className="flex flex-col gap-2 lg:w-[48%]">
//           <label htmlFor="firstname" className="lable-style">
//             First Name
//           </label>
//           <input
//             type="text"
//             name="firstname"
//             id="firstname"
//             placeholder="Enter first name"
//             className="form-style"
//             {...register("firstname", { required: true })}
//           />
//           {errors.firstname && (
//             <span className="-mt-1 text-[12px] text-yellow-100">
//               Please enter your name.
//             </span>
//           )}
//         </div>
//         <div className="flex flex-col gap-2 lg:w-[48%]">
//           <label htmlFor="lastname" className="lable-style">
//             Last Name
//           </label>
//           <input
//             type="text"
//             name="lastname"
//             id="lastname"
//             placeholder="Enter last name"
//             className="form-style"
//             {...register("lastname")}
//           />
//         </div>
//       </div>

//       <div className="flex flex-col gap-2">
//         <label htmlFor="email" className="lable-style">
//           Email Address
//         </label>
//         <input
//           type="email"
//           name="email"
//           id="email"
//           placeholder="Enter email address"
//           className="form-style"
//           {...register("email", { required: true })}
//         />
//         {errors.email && (
//           <span className="-mt-1 text-[12px] text-yellow-100">
//             Please enter your Email address.
//           </span>
//         )}
//       </div>

//       <div className="flex flex-col gap-2">
//         <label htmlFor="phonenumber" className="lable-style">
//           Phone Number
//         </label>

//         <div className="flex gap-5">
//           <div className="flex w-[81px] flex-col gap-2">
//             <select
//               type="text"
//               name="firstname"
//               id="firstname"
//               placeholder="Enter first name"
//               className="form-style"
//               {...register("countrycode", { required: true })}
//             >
//               {CountryCode.map((ele, i) => {
//                 return (
//                   <option key={i} value={ele.code}>
//                     {ele.code} -{ele.country}
//                   </option>
//                 )
//               })}
//             </select>
//           </div>
//           <div className="flex w-[calc(100%-90px)] flex-col gap-2">
//             <input
//               type="number"
//               name="phonenumber"
//               id="phonenumber"
//               placeholder="12345 67890"
//               className="form-style"
//               {...register("phoneNo", {
//                 required: {
//                   value: true,
//                   message: "Please enter your Phone Number.",
//                 },
//                 maxLength: { value: 12, message: "Invalid Phone Number" },
//                 minLength: { value: 10, message: "Invalid Phone Number" },
//               })}
//             />
//           </div>
//         </div>
//         {errors.phoneNo && (
//           <span className="-mt-1 text-[12px] text-yellow-100">
//             {errors.phoneNo.message}
//           </span>
//         )}
//       </div>

//       <div className="flex flex-col gap-2">
//         <label htmlFor="message" className="lable-style">
//           Message
//         </label>
//         <textarea
//           name="message"
//           id="message"
//           cols="30"
//           rows="7"
//           placeholder="Enter your message here"
//           className="form-style"
//           {...register("message", { required: true })}
//         />
//         {errors.message && (
//           <span className="-mt-1 text-[12px] text-yellow-100">
//             Please enter your Message.
//           </span>
//         )}
//       </div>

//       <button
//         disabled={loading}
//         type="submit"
//         className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
//          ${
//            !loading &&
//            "transition-all duration-200 hover:scale-95 hover:shadow-none"
//          }  disabled:bg-richblack-500 sm:text-[16px] `}
//       >
//         Send Message
//       </button>
//     </form>
//   )
// }

//export default ContactUsForm
