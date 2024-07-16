import React, { useState } from "react";
import { BiHide,BiShow,BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updatePassword } from "../../services/operations/authAPI";

const UpdatePassword = () => {
    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);

    const [password,setPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");

    const {loading} =useSelector((state) => state.auth)

    const dispatch=useDispatch();
    const location =useLocation();
    const navigate=useNavigate();

    function handleOnSubmit(e){
        e.preventDefault();
        const token=location.pathname.split("/").at(-1);
        console.log("token",token);
        dispatch(updatePassword(password,confirmPassword,token,navigate))
    }


  return (
     <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        {
            loading ? (<div className="spinner"></div>) :
            (<div className="max-w-[500px] p-4 lg:p-8">
      <div className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Choose New Password</div>
      <div className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">Almost done. Enter your new password and youre all set.</div>

      <form onSubmit={handleOnSubmit}>
        <label className=" relative ">
          <p className=" text-white text-[14px] mt-4 ">
           New Password<sup className=" text-pink-200 ">*</sup>
          </p>
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="Enter Password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="bg-richblack-800 py-3 px-3 rounded-md mt-1  w-full text-richblack-5"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className=" absolute top-0absolute  right-3 top-[40px] cursor-pointer "
          >
            {showPassword ? (
              <BiHide fill="#AFB2BF" fontSize={24} />
            ) : (
              <BiShow fill="#AFB2BF" fontSize={24} />
            )}
          </span>
        </label>
        <label className=" relative ">
          <p className=" text-white text-[14px] mt-4 ">
            Confirm New Password<sup className=" text-pink-200 ">*</sup>
          </p>
          <input
            type={showConfirmPassword ? "text" : "password"}
            required
            placeholder="Enter Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e)=> setConfirmPassword(e.target.value)}
            className="bg-richblack-800 py-3 px-3 rounded-md mt-1  w-full text-richblack-5"
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className=" absolute top-0absolute  right-3 top-[85px] cursor-pointer "
          >
            {showConfirmPassword ? (
              <BiHide fill="#AFB2BF" fontSize={24} />
            ) : (
              <BiShow fill="#AFB2BF" fontSize={24} />
            )}
          </span>
        </label>

        <button className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
        type="submit"
        >Reset Password</button>
      </form>
      <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
    </div>)
        }
     </div>
    
  );
};
export default UpdatePassword;
