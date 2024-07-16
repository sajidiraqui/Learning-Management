import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import * as React from 'react'
import { useEffect } from "react";
import { fetchInstructorCourses } from "../../../services/operations/CourseApi";
import { useSelector } from "react-redux";
import CourseTable from "./CourseTable";
function MyCourse(){
    const navigate=useNavigate();

    const {token}=useSelector((state)=>state.auth);
    const [courses,setCourses]=useState([]);

    // useEffect(()=>{
    //     const fetchCourses=async()=>{
    //         const result =await fetchInstructorCourses(token);
    //         if(result){
    //             setCourses(result);
    //         }
    //     }
    //     fetchCourses();
    //     console.log("courses",courses);
    // },[])
    
    useEffect(() => {
        const fetchCourses = async () => {
          const result = await fetchInstructorCourses(token)
          console.log("result",result);
          if (result) {
            setCourses(result)
          }
        }
        fetchCourses()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    return(
        <div >
            <div className=" mb-14 flex items-center justify-between">
                <h2 className="text-3xl font-medium text-richblack-5" >My Courses</h2>
                <IconBtn text={"Add Course"}
                onclick={() => navigate("/dashboard/add-course")}><FaPlus/></IconBtn>
            </div>
            {courses && <CourseTable courses={courses} setCourses={setCourses}/>}
        </div>
    )
}
export default MyCourse;