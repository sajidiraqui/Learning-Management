import * as React from 'react'
import {FaArrowRight} from "react-icons/fa";
import Highlight from "../components/core/Home/Highlight";
import FTAButton from "../components/core/FTAButton";
import banner from "../assets/Images/banner.mp4";
import { Link } from "react-router-dom";
import CodeBlocks from "../components/core/Home/CodeBlocks";
import TimeLine from "../components/core/Home/TimeLine";
import LearnLangSection from "../components/core/Home/LearnLangSection";
import BecomeInstructor from "../components/core/Home/BecomeInstructor";
import ReviewsSection from "../components/core/Home/ReviewsSection";
import PowerOfCodeSection from "../components/core/Home/PowerOfCodeSection";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
import InstructorSection from '../components/core/Home/InstructorSection';
// import Navbar from "../components/common/Navbar";

const Home = () =>{ 
    return (
      <div >
      <div className="flex flex-col items-center  w-11/12  mx-auto">
         {/* Section 1 */}
         <div className=" bg-richblack-700 mt-16 px-6 py-3 max-w-maxContent rounded-full ">
         <Link to={'/signUp'}>
            <div className=" group text-xl text-richblack-100 flex flex-row items-center gap-4">
                <p>Become an Instructor</p>
                <FaArrowRight className="text-[12px]"/>
            </div>
         </Link>
         </div>

         <div className=" text-richblack-5 lg:text-4xl text-3xl font-bold mt-12 ">
            Empower Your Future with 
            <Highlight text=" Coding Skills" ></Highlight>
         </div>

         <div className=" text-richblack-300 mt-6 w-11/12 lg:max-w-[55%] lg:text-center  font-500 leading-[24px] ">With our online coding courses, you can learn at your own pace, from anywhere in the world
         and get access to a wealth of resources, including hands-on projects quizzes and personalized feedback
         from instructors </div>

         <div className="flex flex-row gap-5 mt-8">
            <FTAButton  active={true} toLink={'/'}   >
            Learn More
            </FTAButton>

            <FTAButton  active={false} toLink={'/'}   >
               Book a Demo
            </FTAButton>
         </div>

         <div className=" lg:max-w-[75%] mx-auto mt-16">
            <video controls autoPlay muted loop >
            <source  src={banner} type="video/mp4"/>
            </video>
         </div>

         <div className="  mx-auto lg:max-w-[80%] ">
            <CodeBlocks 
            position={"lg:flex-row"}
            heading={<div className="  lg:text-4xl text-3xl font-semibold text-richblack-5">
               Unlock Your <Highlight text="coding potential"/> with our online courses.
            </div>}  
            codeColor={" text-yellow-5 "}
            subheading = 
            {
               "Our courses are designed and taught by industry experts who years of experience in coding and are passionate about sharing their knowledge with you "
            } 
            btn1={
               {
               btnText:"Try it yourself ",
               linkto:"/signup",
               active:true,
               }
            } 
            btn2={
               {
               btnText:"Learn more ",
               linkto:"/login",
               active:false,
               }
            } 
            Codeblocks={`<!DOCTYPE html>\n<html>\n head><>Example</\n title><linkrel="stylesheet"href="styles.css">\n/head>\nbody\n<h1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
            />
         </div>

         <div className=" w-full lg:max-w-[80%] mx-auto">
            <CodeBlocks 
            position={"lg:flex-row-reverse "}
            heading={<div className="  text-4xl font-semibold text-richblack-5">
               Start  <Highlight text={`coding`}/> <br/> <Highlight text="in seconds"/> 
            </div>}  
            codeColor={" text-yellow-5 "}
            subheading = 
            {
               "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson. "
            } 
            btn1={
               {
               btnText:"Continue Lesson",
               linkto:"/signup",
               active:true,
               }
            } 
            btn2={
               {
               btnText:"Learn more",
               linkto:"/login",
               active:false,
               }
            } 
            Codeblocks={`<!DOCTYPE html>\n<html>\n head><>Example</\n title><linkrel="stylesheet"href="styles.css">\n/head>\nbody\n<h1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
            />
         </div>
        </div>
        <PowerOfCodeSection/>
        {/* Section 2 */}
        <div className=" bg-richblack-5">
         <div className=" w-11/12 lg:w-10/12 mx-auto flex lg:flex-row flex-col gap-7 pt-10 ">
               <div className=" lg:text-4xl text-3xl font-bold ">
               Get the skills you need for a <Highlight text={" job that is in demand."}/> </div>
               <div className=" flex flex-col items-start gap-y-10 ">
                  <p className=" text-pure-greys-600 w-[88%]  ">The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                  <FTAButton active={true} >Learn More</FTAButton>
               </div>
            </div>

         <TimeLine/>
         <LearnLangSection/>
        </div>
         {/* Section 3 */}
         {/* <div className=" h-fit">
            <BecomeInstructor/>
         </div> */}
         <div className="relative mx-auto my-20  w-11/12 max-w-maxContent  flex flex-col justify-between gap-8 bg-richblack-900 text-white">
        {/* Become a instructor section */}
        <InstructorSection />

        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>

         {/* footer */}
         <Footer/>
      </div>
        
    )
}

export default Home; 
