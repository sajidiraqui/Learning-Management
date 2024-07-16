import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { updateProfile } from "../../../../services/operations/SettingsAPI";
import IconBtn from "../../../common/IconBtn";

const EditProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
        dispatch(updateProfile(token,data,navigate));
        console.log("user",user);
    } catch (error) {
        console.log("ERROR MESSAGE - ", error.message)
    }
  };
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <h2 className="text-lg font-semibold text-richblack-5">
          Profile Information
        </h2>
        <div className=" flex justify-between items-center gap-x-4 ">
          <div className=" flex flex-col w-full ">
            <label className="text-richblack-300 ">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter First Name"
              className="form-style bg-richblack-700 py-3 px-3 rounded-md mt-1  w-full text-richblack-5 "
              {...register("firstName", { required: true })}
              defaultValue={user?.firstName}
            />
            {errors.firstName && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your first name.
              </span>
            )}
          </div>
          <div className=" flex flex-col w-full ">
            <label className="text-richblack-300 ">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter Last Name"
              className="form-style bg-richblack-700 py-3 px-3 rounded-md mt-1  w-full text-richblack-5 "
              {...register("lastName", { required: true })}
              defaultValue={user?.lastName}
            />
            {errors.lastName && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your last name.
              </span>
            )}
          </div>
        </div>

        <div className=" flex justify-between items-center gap-x-4 ">
          <div className=" flex flex-col w-full ">
            <label className="text-richblack-300 ">Date Of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              placeholder="dd/mm/yyyy"
              className="form-style bg-richblack-700 py-3 px-3 rounded-md mt-1  w-full text-richblack-5 "
              {...register("dateOfBirth", { required: true })}
            />
            {errors.dateOfBirth && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your date of birth.
              </span>
            )}
          </div>
          <div className=" flex flex-col w-full ">
            <label className="text-richblack-300 ">Gender</label>
            <select
              type="text"
              name="gender"
              id="gender"
              placeholder="Enter Last Name"
              className="form-style bg-richblack-700 py-3 px-3 rounded-md mt-1  w-full text-richblack-5 "
              {...register("gender", { required: true })}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your gender.
              </span>
            )}
          </div>
        </div>

        <div className=" flex justify-between items-center gap-x-4 ">
          <div className=" flex flex-col w-full ">
            <label className="text-richblack-300 ">Contact Number</label>
            <input
              type="number"
              name="contactNumber"
              id="contactNumber"
              placeholder="Enter Contact Number"
              className="form-style bg-richblack-700 py-3 px-3 rounded-md mt-1  w-full text-richblack-5 "
              {...register("contactNumber", { required: true })}
            />
            {errors.contactNumber && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your contact Number.
              </span>
            )}
          </div>
          <div className=" flex flex-col w-full ">
            <label className="text-richblack-300 ">About</label>
            <input
              type="text"
              name="about"
              id="about"
              placeholder="Enter Bio Details"
              className="form-style bg-richblack-700 py-3 px-3 rounded-md mt-1  w-full text-richblack-5 "
              {...register("about", { required: true })}
            />
            {errors.about && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter Bio details.
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 ">
        <button onClick={()=>{
          navigate("/dashboard/my-profile")
        }}
        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50">
          Cancel
        </button>
        <IconBtn type="submit" text={"save"}/>
      </div>
    </form>
  );
};
export default EditProfile;
