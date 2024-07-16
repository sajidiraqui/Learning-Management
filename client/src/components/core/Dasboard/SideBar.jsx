import React, { useState } from "react";
import SideBarLink from "./SideBarLink";
import { sidebarLinks } from "../../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import { VscSignOut } from "react-icons/vsc";
import { logout } from "../../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
const SideBar = () => {
  const { user } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmationModal, setConfirmationModal] = useState(null);

  console.log("user", user.accountType);
  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
      <div className="flex flex-col">
        {sidebarLinks.map((link,ind) => {
          if (link.type && user?.accountType !== link.type) return null;
          return (
            <SideBarLink
              name={link.name}
              linkpath={link.path}
              iconName={link.icon}
              key={ind}
            />
          );
        })}
      </div>
      <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
      <div className=" flex flex-col">
        <SideBarLink
          name={"Settings"}
          linkpath={"/dashboard/settings"}
          iconName={"VscSettingsGear"}
        />

        <button
          className=" text-richblack-300 px-8 py-2 gap-2 "
          onClick={() =>
            setConfirmationModal({
              text1: "Are you sure?",
              text2: "You will be logged out of your account.",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler: () => setConfirmationModal(null),
            })
          }
        >
          <div className="flex gap-x-2 items-center">
            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </div>
        </button>
      </div>
      {
        confirmationModal&&<ConfirmationModal modalData={confirmationModal}/>
      }
    </div>
      );
};

export default SideBar;
