import React, { useState } from "react";
import IconBtn from "../../../../common/IconBtn";
import { IoAddCircleOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import NestedView from "./NestedView";
import { createSection,updateSection } from "../../../../../services/operations/CourseApi";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import { toast } from "react-hot-toast";

const CourseBuilderForm = () => {
  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const {token} = useSelector((state) => state.auth);
  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectinName", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };
  const onsubmit = async (data) => {
    console.log("data",data);
    let result;
    setLoading(true);
    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }
    console.log("result",result);
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    setLoading(false);
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    console.log("sectionId",sectionId);
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };


  const goNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section ");
      return;
    }
    if (
      course.courseContent.some((section) => section.subsection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }
    dispatch(setStep(3));
  };
  return (
    <div className=" bg-richblack-800 p-4 rounded-md ">
      <div className="text-richblack-5 font-bold text-xl ">Course Builder</div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className=" flex flex-col space-y-2 my-5 ">
          <label className=" text-richblack-5 ">
            Section Name<sup className=" text-pink-200">*</sup>
          </label>
          <input
            placeholder="Add a section to build your course "
            className=" bg-richblack-700 px-4 py-3 rounded-md text-richblack-50  "
            {...register("sectionName", { required: true })}
          />
          {errors.sectionName && <span>Section Name is required</span>}
        </div>
        <IconBtn
          text={`${editSectionName ? "Edit Section Name" : "Create Section"}`}
          className=" "
          outline={true}
        >
          <IoAddCircleOutline size={20} className="text-yellow-50" />
        </IconBtn>
        {editSectionName && (
          <button
            type="button"
            onClick={cancelEdit}
            className="text-sm text-richblack-300 underline"
          >
            Cancel Edit
          </button>
        )}
      </form>
      {course.courseContent.length > 0 && (
          <NestedView
            handleChangeEditSectionName={handleChangeEditSectionName}
          />
        )}
        {/* prev and next button */}
        <div className=" flex justify-end items-center space-x-2 ">
          <button
            onClick={goBack}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          > Back
          </button>
          <IconBtn text={"Next"} type="button" onclick={()=>goNext()}>
            <MdNavigateNext />
          </IconBtn>
        </div>
    </div>
  );
};
export default CourseBuilderForm;
