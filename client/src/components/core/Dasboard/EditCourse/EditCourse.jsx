import React from "react";
import RenderingSteps from "../AddCourse/RenderingSteps";
import { useDispatch, useSelector } from "react-redux";
import { setCourse,setEditCourse } from "../../../../slices/courseSlice";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getFullDetailsOfCourse } from "../../../../services/operations/CourseApi";
const EditCourse = () => {
    const {course,editCourse}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);
    const [loading,setLoading]=useState(false);
    const {courseId}=useParams();
    const dispatch=useDispatch();

    useEffect(()=>{
        ;(
            async ()=>{
                setLoading(true);
                console.log("EditCourse1",editCourse);
                const result = await getFullDetailsOfCourse(courseId, token)
                if (result?.courseDetails) {
                    dispatch(setEditCourse(true))
                    console.log("editcourse1",editCourse);
                    dispatch(setCourse(result?.courseDetails))
                  }
                  setLoading(false)
            }
        )()
    },[])
  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Course
      </h1>
      <div className="mx-auto max-w-[600px]">
        {course ? (
          <RenderingSteps />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Course not found
          </p>
        )}
      </div>
    </div>
  );
};
export default EditCourse;
