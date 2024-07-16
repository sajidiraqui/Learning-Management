import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { resetPasswordToken } from "../../services/operations/authAPI";
const ResetPassword = () => {
  const [sentEmail, setSentEmail] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  //const {loading} =useSelector((state)=> state.auth);
  const { loading } = useSelector((state) => state.auth);

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(resetPasswordToken(email, setSentEmail))

  }
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <div className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {!sentEmail ? "Reset Password" : "Check Email"}
          </div>
          <div className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            {!sentEmail
              ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : "We have sent the reset email to youremailaccount@gmail.com"}
          </div>
          <form onSubmit={handleOnSubmit}>
            {!sentEmail && (
              <label>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  className="bg-richblack-800 py-3 px-3 rounded-md mt-1  w-full text-richblack-5"   
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                />
              </label>
            )}
            <button type="submit" 
            className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900" >
              {!sentEmail ? "Reset Password " : "Resend Email"}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default ResetPassword;
