import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmationModal from "../../ConfirmationModal";
import { setCourse } from "../../../../../slices/courseSlice";
import { deleteSection } from "../../../../../services/operations/CourseApi";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import * as React from "react";
import { AiFillCaretDown } from "react-icons/ai";
import SubSectionModal from "./SubSection";
import { deleteSubSection } from "../../../../../services/operations/CourseApi";

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const { token } = useSelector((state) => state.auth);

  // States to keep track of mode of modal [add, view, edit]
  const [addSubSection, setAddSubsection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const dispatch = useDispatch();

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection(
      {
        sectionId: sectionId,
        courseId: course._id,
      },
      token
    );
    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  const handleDeleteSubSection=async(subSectionId,sectionId)=>{
    const result=await deleteSubSection(
      {
        subSectionId:subSectionId,
        sectionId:sectionId
      },
      token
    );
    if(result){
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal(null);
  }
  return (
    <div className=" rounded-lg bg-richblack-700 p-6 px-8 mt-10 ">
      {course?.courseContent?.map((section) => (
        //Section dropdown
        <details key={section._id} open>
          <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2  ">
            <div className=" flex text-richblack-50 items-center gap-x-3  ">
              <RxDropdownMenu className="text-2xl text-richblack-50" />
              <p>{section.sectionName}</p>
            </div>
            <div className=" flex  items-center gap-x-3 ">
              <button>
                <MdEdit
                  className="text-xl text-richblack-300"
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                />
              </button>
              <button>
                <RiDeleteBin6Line
                  className="text-xl text-richblack-300"
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this section",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                />
              </button>
              <span className="font-medium text-richblack-300">|</span>
              <AiFillCaretDown className={`text-xl text-richblack-300`} />
            </div>
          </summary>
          <div className="px-6 pb-4">
            {section.subsection.map((data) => (
              <div
                key={data?._id}
                onClick={() => setViewSubSection(data)}
                className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
              >
                <div className="flex items-center gap-x-3 py-2 ">
                  <RxDropdownMenu className="text-2xl text-richblack-50" />
                  <p className="font-semibold text-richblack-50">
                    {data.title}
                  </p>
                </div>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-x-3"
                  >
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit className="text-xl text-richblack-300" />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Sub-Section?",
                          text2: "This lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="text-xl text-richblack-300" 
                      />
                    </button>
                  </div>
              </div>
            ))}
            <button
              className="mt-3 flex items-center gap-x-1 text-yellow-50"
              onClick={() => setAddSubsection(section._id)}
            >
              <FaPlus className="text-lg" />
              <p>Add Lecture</p>
            </button>
          </div>
        </details>
      ))}
      {/* Modal display */}
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <></>
      )}
      {/* Confirmation Modal */}
      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <></>
      )}
    </div>
  );
};
export default NestedView;
