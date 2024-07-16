import React from "react";
import * as Icon1 from "react-icons/bi";
import * as Icon3 from "react-icons/hi2";
import * as Icon2 from "react-icons/io5";

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@studynotion.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
];
const ContactDetails = () => {
  return (
    <div className=" flex flex-col gap-5 p-10 bg-richblack-700">
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon];
        return (
          <div className=" flex flex-col ">
            <div className=" flex gap-5 ">
              <div className=" text-richblack-5">
              <Icon size={25}  />
              </div>
              <div>
                <h1 className=" text-xl font-bold text-richblack-5">{ele?.heading}</h1>
                <p>{ele?.description}</p>
                <p>{ele?.details}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ContactDetails;
