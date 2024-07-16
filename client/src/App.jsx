import { Route, Routes, useNavigate } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import * as React from 'react'
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./components/auth/login";
import Signup from "./components/auth/Signup";
import Openroute from "./components/auth/Openroute";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./components/auth/ResetPassword";
import UpdatePassword from "./components/auth/UpdatePassword";
import Navbar from "./components/common/Navbar";
import MyProfile from "./components/core/Dasboard/MyProfile";
import Settings from "./components/core/Dasboard/Settings/Index";
import EnrolledCourses from "./components/core/Dasboard/EnrolledCourses";
import Cart from "./components/core/Dasboard/Cart";
import Error from "./pages/Error";
import AddCourse from "./components/core/Dasboard/AddCourse/Index";
import MyCourse from "./components/core/Dasboard/MyCourse";
import EditCourse from "./components/core/Dasboard/EditCourse/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import VideoDetails from "./components/core/Dasboard/ViewCourse/VideoDetails";
import ViewCourse from "./pages/ViewCourse";
import Instructor from "./components/core/Dasboard/Instructor";
import { getUserDetails } from "./services/operations/profileAPI";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ACCOUNT_TYPE } from "./utils/constants";

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, navigate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className=" w-screen min-h-screen bg-richblue-900 flex flex-col font-inter ">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/catalog/:catalogName" element={<Catalog/>}/>
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route
          path="/resetPasswordToken"
          element={
            <Openroute>
              <ResetPassword />
            </Openroute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <Openroute>
              <VerifyEmail />
            </Openroute>
          }
        />

        <Route
          path="update-password/:id"
          element={
            <Openroute>
              <UpdatePassword/>
            </Openroute>
          }
        />
        {/* Private Route - for Only Logged in User */}
        <Route
        element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/my-courses" element={<MyCourse />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
            </>
          )}
          {/* Route only for Students */}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
              <Route path="/dashboard/cart" element={<Cart />} />
            </>
          )}
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings/>}/>

        </Route>

        {/* For the watching course lectures */}
        <Route element={
          <PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>
        }>
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>
        {/* <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route> */}
        <Route path="*" element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
