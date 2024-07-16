import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { settingsEndpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";
import { useSelector } from "react-redux";
import { logout } from "./authAPI";

const { UPDATE_DISPLAY_PICTURE_API,UPDATE_PROFILE_API,CHANGE_PASSWORD_API,DELETE_PROFILE_API } = settingsEndpoints;

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
        console.log("STRAT")
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorisation: `Bearer ${token}`,
        }
      );
      console.log("End");
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Display Picture Updated Successfully");
      dispatch(setUser(response.data.data));
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
      toast.error("Could Not Update Display Picture");
    }
    toast.dismiss(toastId);
  };
}

export function updateProfile(token,data,navigate){
  
  return async (dispatch)=>{
    const toastId =toast.loading("Loading...");
    try{
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, data, {
        Authorisation: `Bearer ${token}`,
      })
      console.log("UPDATE_PROFILE_API API RESPONSE............", response)

      if(!response.data.success){
        return new Error(response.data.message);
      }

      console.log("first")
      const userImage = response.data.updatedUserDetails.image
        ? response.data.updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
        console.log("second",);
        dispatch(setUser({...response.data.updatedUserDetails, image: userImage}))
        console.log("third")
        toast.dismiss(toastId);
        toast.success("Profile Updated Successfully ");
        navigate('/dashboard/my-profile');

    } catch(error){
      console.log("UPDATE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId)
  }
}

export function changePassword(data,token){
  return async (dispatch)=>{
    const toastId=toast.loading("Loading....");

    try{
      const response=await apiConnector("POST",CHANGE_PASSWORD_API,data,
      {
        "Content-Type": "multipart/form-data",
          Authorisation: `Bearer ${token}`,
      }
      );

      console.log("Response",response);

      if(!response.data.success){
        return new Error(response.data.message);
      }

      toast.success("Password Changed Successfully")
    }
    catch(error){
      console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error("Could Not Update Password");
    }
    toast.dismiss(toastId);
  }
}

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    console.log("first");
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorisation: `Bearer ${token}`,
      })
      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  }
}