import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { BiHide, BiShow } from "react-icons/bi";
import IconBtn from "../../../common/IconBtn";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../../../services/operations/SettingsAPI";

const UpdatePassword = () => {
  const { user } = useSelector((state) => state.auth);
  const {token}=useSelector((state)=>state.auth);
  const [showOldPassword, setShowOldPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler=(data)=>{
    console.log("data",data);
    dispatch(changePassword(data,token));
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <h2 className="text-lg font-semibold text-richblack-5">
          Update Password
        </h2>
        <div className=" w-[50%] pr-2 relative ">
          <div className=" flex flex-col w-full ">
            <label className="text-richblack-300 ">Current Passsword</label>
            <input
              type={`${showOldPassword ? "password" : "text"}`}
              name="oldPassword"
              id="oldPassword"
              placeholder="Enter Current Password"
              className="form-style bg-richblack-700 py-3 px-3 rounded-md mt-1  w-full text-richblack-5 "
              {...register("oldPassword", { required: true })}
            />
            <span
              onClick={() => setShowOldPassword(!showOldPassword)}
              className=" absolute  right-3 top-[40px] cursor-pointer "
            >
              {showOldPassword ? (
                <BiHide fill="#AFB2BF" fontSize={24} />
              ) : (
                <BiShow fill="#AFB2BF" fontSize={24} />
              )}
            </span>
            {errors.oldPassword && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your current password.
              </span>
            )}
          </div>
        </div>
        <div className=" flex justify-between items-center gap-x-4">
          <div className=" flex flex-col w-full relative ">
            <label className="text-richblack-300 ">New Password</label>
            <input
              type={`${showPassword ? "password" : "text"}`}
              name="newPassword"
              id="newPassword"
              placeholder="Enter New Passsword"
              className="form-style bg-richblack-700 py-3 px-3 rounded-md mt-1  w-full text-richblack-5 "
              {...register("newPassword", { required: true })}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="  absolute  right-3 top-[40px] cursor-pointer "
            >
              {showPassword ? (
                <BiHide fill="#AFB2BF" fontSize={24} />
              ) : (
                <BiShow fill="#AFB2BF" fontSize={24} />
              )}
            </span>
            {errors.newPassword && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your new Passsword.
              </span>
            )}
          </div>
          <div className=" flex flex-col w-full relative ">
            <label className="text-richblack-300 ">Confirm Password</label>
            <input
              type={`${showConfirmPassword ? "password" : "text"}`}
              name="confirmNewPassword"
              id="confirmNewPassword"
              placeholder="Confirm New Passsword"
              className="form-style bg-richblack-700 py-3 px-3 rounded-md mt-1  w-full text-richblack-5 "
              {...register("confirmNewPassword", { required: true })}
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className=" absolute top-0absolute  right-3 top-[40px] cursor-pointer "
            >
              {showConfirmPassword ? (
                <BiHide fill="#AFB2BF" fontSize={24} />
              ) : (
                <BiShow fill="#AFB2BF" fontSize={24} />
              )}
            </span>
            {errors.confirmNewPassword && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please confirm your new Passsword.
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 ">
        <button
          onClick={() => {
            navigate("/dashboard/my-profile");
          }}
          className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
        >
          Cancel
        </button>
        <IconBtn type="submit" text={"save"} />
      </div>
    </form>
  );
};
export default UpdatePassword;
