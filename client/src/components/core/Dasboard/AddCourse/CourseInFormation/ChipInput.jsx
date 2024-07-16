import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ChipInput = ({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [chips, setChips] = useState([]);
  const { editCourse, course } = useSelector((state) => state.course);

  useEffect(() => {
    if (editCourse) {
      // console.log(course)
      setChips(course?.tag);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue(name, chips);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chips]);

  const handleKeyDown = (event) => {
    //check if user press enter key or ,
    if (event.key === "Enter" || event.key === ",") {
      //prevent default behaviour of event
      event.preventDefault();
      // // Get the input value and remove any leading/trailing spaces
      const chipValue = event.target.value.trim();
      // // Check if the input value exists and is not already in the chips array
      if (chipValue && !chips.includes(chipValue)) {
        // Add the chip to the array and clear the input
        const newChips = [...chips, chipValue];
        setChips(newChips);
        event.target.value = "";
      }
    }
  };
  const handleDeleteChip = (chipIndex) => {
    const newChips = chips.filter((_, index) => index !== chipIndex);
    setChips(newChips);
  };
  return (
    <div className="flex flex-col space-y-2">
      <label className=" text-richblack-5 ">{label}</label>
      <div className=" flex w-full flex-wrap gap-y-2">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
          >
            {chip}
            <button
              onClick={() => handleDeleteChip(index)}
              className="ml-2 focus:outline-none"
            >
              <MdClose />
            </button>
          </div>
        ))}
      </div>
      <input
        name={name}
        id={name}
        type="text"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        className="bg-richblack-700 px-4 py-3  rounded-md text-richblack-5"
      />
      {/* Render an error message if the input is required and not filled */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
};
export default ChipInput;
