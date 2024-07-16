import React from "react";
import { useSelector } from "react-redux";
import IconBtn from "../../common/IconBtn";
import { RiEditBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../services/operations/CourseApi";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  console.log("user",user);
  const navigate = useNavigate();
  return (
    <div className=" ">
      <h1 className=" text-3xl font-semibold mb-14 text-richblack-5 ">
        My Profile{" "}
      </h1>
      {/* section 1 */}
      <div className=" p-8 px-12 flex items-center justify-between border border-richblack-700 bg-richblack-800 rounded-md  ">
        <div className=" flex items-center gap-x-4 ">
          <img
            src={user?.image}
            className=" aspect-square w-[78px] rounded-full object-cover"
          />
          <div className=" space-y-1">
            <p className=" text-lg font-semibold text-richblack-5  ">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <IconBtn text={"Edit"}
        onclick={()=>navigate("/dashboard/settings")
        }>
          <RiEditBoxLine />
        </IconBtn>
      </div>
      {/* sectiion 2 */}

      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>

      {/* section 3 */}
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className=" flex items-center justify-between ">
          <p className=" text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn text={"Edit"}
          onclick={()=>navigate("/dashboard/settings")}>
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className=" flex justify-between w-[500px]">
          <div className=" flex flex-col gap-y-4">
            <div className=" space-y-1">
              <p className=" text-richblack-300 ">First Name</p>
              <p className=" text-richblack-5">{user?.firstName}</p>
            </div>
            <div className=" space-y-1">
              <p className=" text-richblack-300 ">email</p>
              <p className=" text-richblack-5">{user?.email}</p>
            </div>
            <div className=" space-y-1">
              <p className=" text-richblack-300 ">Add gender</p>
              <p className=" text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className=" space-y-1 ">
              <p className=" text-richblack-300 text-sm">Last Name</p>
              <p className=" text-richblack-5 text-lg font-medium">{user?.lastName}</p>
            </div>
            <div className=" flex flex-col gap-1">
              <p className=" text-richblack-300">Contact Number</p>
              <p className=" text-richblack-5">
                {user?.additionalDetails.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div className=" flex flex-col gap-1">
              <p className=" text-richblack-300">Date of Birth</p>
              <p className=" text-richblack-5">
                {user?.additionalDetails.dateOfBirth ? user?.additionalDetails.dateOfBirth  :"Add Date of Birth "}
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};
export default MyProfile;
