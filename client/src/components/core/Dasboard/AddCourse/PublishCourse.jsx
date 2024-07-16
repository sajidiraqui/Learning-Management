import React from "react";
import IconBtn from "../../../common/IconBtn";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../../../slices/courseSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { COURSE_STATUS } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { resetCourseState } from "../../../../slices/courseSlice";
import { editCourseDetails } from "../../../../services/operations/CourseApi";

const PublishCourse = () => {
  const { handleSubmit, register,getValues,setValue,reset } = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {course}=useSelector((state)=>state.course);
  const {token}=useSelector((state)=>state.auth);
  const navigate=useNavigate();

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [])

  const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  const goBack = () => {
    dispatch(setStep(2));
  };

  const hnadleCoursePublish = async () => {
    // check if form has been updated or not
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // form has not been updated
      // no need to make api call
      goToCourses();
      return;
    }

    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);
    setLoading(true);
    const result = await editCourseDetails(formData, token);
    if (result) {
      goToCourses();
    }
    setLoading(false);
  };

  const onSubmit = async (data) => {
    hnadleCoursePublish();
  };

  return (
    <div className=" bg-richblue-800 p-5 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className=" text-xl font-semibold text-richblack-5">
          Publish Course
        </h2>
        <div className="mt-5 space-x-2 ">
          <input
            type="checkbox"
            id="public"
            className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            {...register("public")}
          />
          <label className=" text-richblack-300">
            Make this Course as Public
          </label>
        </div>

        <div className=" flex justify-end gap-x-2 mt-5">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Back
          </button>
          <IconBtn type="submit">Save Changes</IconBtn>
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;
