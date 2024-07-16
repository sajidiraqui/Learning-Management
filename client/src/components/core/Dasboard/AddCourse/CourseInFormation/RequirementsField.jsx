import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const RequirementsField = ({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementsList, setRequirementsList] = useState([]);
  const { editCourse, course } = useSelector((state) => state.course);

  //   useEffect(()=>{
  //     setValue(name,requirementsList);
  //   },[requirementsList])

  useEffect(() => {
    if (editCourse) {
      console.log("courseDe",course)
      setRequirementsList(course?.instructions);
      console.log("courseRe",course?.instructions);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue(name, requirementsList);
    console.log("req",requirementsList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementsList]);

  const handleOnAdd = () => {
    console.log("first", requirement);
    if (requirement) {
      setRequirementsList([...requirementsList, requirement])
      console.log(requirementsList);
      setRequirement("");
    }
  };

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementsList([...requirementsList, requirement])
      setRequirement("")
    }
  }

  const handleOnClear = (index) => {
    const updateReuirement = [...requirementsList];
    updateReuirement.splice(index, 1);
    setRequirementsList(updateReuirement);
  };
  return (
    <div>
        {/* <label className="text-sm text-richblack-5" htmlFor={name}>
         {label} <sup className="text-pink-200">*</sup>
       </label>
       <div className="flex flex-col items-start space-y-2">
         <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="form-style w-full"
        />
        <button
          type="button"
          onClick={handleOnAdd}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div> */}
         <label className=" text-richblack-5">{label}</label>
           <input
            type="text"
            id={name}
            value={requirement}
            placeholder=""
            onChange={(e) => setRequirement(e.target.value)}
            className=" form-style py-3 px-4 bg-richblack-700 rounded-md w-full text-richblack-300 "
          />
          
          <button
          type="button"
          onClick={handleOnAdd}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
        {
            requirementsList.length>0&&
            <ul className="mt-2 list-inside list-disc">
            {
                
                requirementsList.map((ele,index)=>(
                    <li key={index} className="flex items-center text-richblack-5">
                        <p>{ele}</p>
                        <button
                        type="button"
                        className="ml-2 text-xs text-pure-greys-300 "
                        onClick={()=>handleOnClear(index)}>clear</button>
                    </li>
                ))
            }
          </ul>
        }
        {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
    
  );
};
export default RequirementsField;
