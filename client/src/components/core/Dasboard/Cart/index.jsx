import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import TotalAmount from "./TotalAmount";
import CartCourse from "./CartCourses";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const {cart}=useSelector((state)=> state.cart);
  const {user}=useSelector((state)=> state.profile)
  const dispatch=useDispatch();
  const navigate=useNavigate();

  // const handleBuyCourse = () => {
  //   if (token) {
  //     BuyCourse(token, cart , user, navigate, dispatch)
  //     return
  //   }
  //   setConfirmationModal({
  //     text1: "You are not logged in!",
  //     text2: "Please login to Purchase Course.",
  //     btn1Text: "Login",
  //     btn2Text: "Cancel",
  //     btn1Handler: () => navigate("/login"),
  //     btn2Handler: () => setConfirmationModal(null),
  //   })
  // }
  const { totalItems, total } = useSelector((state) => state.cart);
  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">Cart</h1>
      <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
        {totalItems} Courses in Cart
      </p>
      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
            <CartCourse/>
            <TotalAmount/>
        </div>
      ) : (
        <p className="mt-14 text-center text-3xl text-richblack-100">
          Your cart is empty
        </p>
      )}
    </div>
  );
};
export default Cart;
