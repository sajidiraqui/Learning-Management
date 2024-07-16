import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLoading } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import {resetCart} from "../../slices/cartSlice";
import { endpoints } from "../apis";
import { FaChalkboardTeacher } from "react-icons/fa";
const {SENDOTP_API,SIGNUP_API,LOGIN_API,RESETPASSTOKEN_API,RESETPASSWORD_API} =endpoints;


export function otpSend(email,navigate){
    return async (dispatch) =>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));

        try{
            const response = await apiConnector("POST",SENDOTP_API,{ email,checkUserPresent: true,});

            console.log("SENDOTP API RESPONSE............", response);
            console.log(response.data.success);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("OTP sent successfully ");
            navigate("/verify-email");
        }
        catch(err){
            console.log("SENDOTP API ERROR............", err)
            toast.error("Could Not Send OTP")
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
  ) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", SIGNUP_API, {
          accountType,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          otp,
        })
  
        console.log("SIGNUP API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Signup Successful")
        navigate("/login")
      } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        toast.error("Signup Failed")
        navigate("/signup")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }

  export function login(email,password,navigate){
    return async (dispatch) =>{
      const toastId=toast.loading("Loding...");
      dispatch(setLoading(true));
      try{
        console.log("a");
        const response=await apiConnector("POST",LOGIN_API,{email,password});
        console.log("Response... ",response);

        if (!response.data.success) {
          throw new Error(response.data.message)
        }

        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        
        
        dispatch(setUser({ ...response.data.user, image: userImage }))
        localStorage.setItem("token", JSON.stringify(response.data.token))
        navigate("/dashboard/my-profile")
        
      }
      catch(err){
        console.log("LOGIN API ERROR............", err)
        toast.error("Login Failed")
        navigate("/login")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }

  export function resetPasswordToken(email,setSentEmail){
    console.log("email",email)
    return async (dispatch) =>{
      const toastId=toast.loading("Loading...");
      dispatch(setLoading(true));
      try{

        const response= await apiConnector("POST",RESETPASSTOKEN_API, {email});
        console.log("RESETPASSTOKEN RESPONSE............", response);

        if(!response.data.success){
          throw new Error(response.data.message);
        }

        toast.success("Reset Email Sent")
        setSentEmail(true)

      } catch(err){
        console.log("RESETPASSTOKEN ERROR............", err)
        toast.error("Failed To Send Reset Email")
      }
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  }

  export function updatePassword(password,confirmPassword,token,navigate){
    return async (dispatch) =>{
      const toastId=toast.loading("Loading..");
      dispatch(setLoading(true));
      try{
        if(password!==confirmPassword){
          toast.error("Pls Fill correct Password");
          return;
        }

        const response=await apiConnector("POST",RESETPASSWORD_API,{password,confirmPassword,token});

        if(!response.data.success){
          throw new Error(response.data.message);
        }

        toast.success("Update Password successfully");
        navigate("/login");

      } catch(err){
        console.log("RESETPASSword ERROR............", err)
        toast.error("Failed To Send Reset passwrod")
      }
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  }

export function logout(navigate){
   return  (dispatch)=>{
     dispatch(setToken(null))
     dispatch(setUser(null));
     dispatch(resetCart())
     localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}