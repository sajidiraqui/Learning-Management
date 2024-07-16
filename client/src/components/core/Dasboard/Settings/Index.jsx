import React from "react";
import UpdatePicture from "./UpdatePicture";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";

const Settings = () => {
  return (
    <div>
      <h1 className="mb-14 text-3xl  font-semibold text-richblack-5">
        Edit Profile
      </h1>
      {/* section 1 */}
      <UpdatePicture/>
      {/* Section 2 */}
      <EditProfile/>
      {/* Section 3 */}
      <UpdatePassword/>
      {/* Section 4 */}
      <DeleteAccount/>
    </div>
  );
};
export default Settings;
