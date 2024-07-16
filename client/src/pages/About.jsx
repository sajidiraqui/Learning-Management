import React from "react";
import Navbar from "../components/common/Navbar";
import Highlight from "../components/core/Home/Highlight";
import image1 from "../assets/Images/aboutus1.webp";
import image2 from "../assets/Images/aboutus2.webp";
import image3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/AboutPage/Quote";
import fonudaryImage from "../assets/Images/FoundingStory.png";
import LearningGrid from "../components/core/AboutPage/LearingGrid";
import ConatactFormSection from "../components/core/AboutPage/ContactFormSection";
import Footer  from "../components/common/Footer";

const About = () => {
  const states = [
    {
      data: "Active Students",
      value: "5k",
    },
    {
      data: "Mentors",
      value: "10+",
    },
    {
      data: "Courses",
      value: "200+",
    },
    {
      data: "Awards",
      value: "50+",
    },
  ];
  return (
    <div className="relative">
      {/* section 1 */}
      <section className=" bg-richblack-700 ">
        <div className=" relative flex flex-col gap-y-7 w-11/12 lg:w-10/12 mx-auto items-center  text-richblack-200 ">
          <div className=" mt-20">About us</div>
          <h1 className=" lg:text-4xl text-xl font-bold text-richblack-5 text-center lg:w-[70%]  ">
            Driving Innovation in Online Education for a{" "}
            <Highlight text={"Brighter Future"} />
          </h1>
          <p className=" text-richblack-300 font-semibold text-sm text-center lg:w-[70%]  ">
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </p>
          <div className=" lg:h-[250px] h-[700px]"></div>
          <div className=" absolute lg:-bottom-[10%] lg:translate-y-[5%] flex lg:flex-row flex-col gap-5 translate-y-[65%] ">
            <img src={image1} />
            <img src={image2} />
            <img src={image3} />
          </div>
        </div>
      </section>

      {/* section 2 */}
      <section className=" py-20">
        <Quote />
      </section>

      {/* section 3 */}
      <section>
        {/* part 1 */}
        <div className=" flex md:flex-row flex-col w-11/12 lg:w-10/12 mx-auto gap-10 pb-20  ">
          <div className=" md:w-[50%] lg:px-10  flex flex-col lg:gap-y-10 gap-5  ">
            <h1 className="lg:text-4xl font-semibold text-3xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent">
              Our Foundary Story
            </h1>
            <p className=" text-richblack-300 lg:text-[16px] ">
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
            </p>
            <p className=" text-richblack-300">
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned
              a platform that could bridge these gaps and empower individuals
              from all walks of life to unlock their full potential.
            </p>
          </div>
          <div className=" lg:w-[50%] py-10 ">
            <img src={fonudaryImage} />
          </div>
        </div>
        {/* part 2 */}
        <div className=" flex lg:flex-row flex-col lg:w-10/12 w-11/12 mx-auto gap-20 lg:p-10 lg:my-20 my-5 ">
          <div className=" flex flex-col lg:gap-10 gap-5 lg:w-[50%]   ">
            <h1 className=" lg:text-4xl text-3xl font-bold bg-gradient-to-br from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent ">
              Our Vision
            </h1>
            <p className=" text-richblack-300 lg:w-[90%]">
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people learn.
              Our team of dedicated experts worked tirelessly to develop a
              robust and intuitive platform that combines cutting-edge
              technology with engaging content, fostering a dynamic and
              interactive learning experience.
            </p>
          </div>
          <div className=" flex flex-col lg:w-[50%] lg:gap-10 gap-5 ">
            <h1 className=" lg:text-4xl text-3xl font-semibold bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent">
              Our Mission
            </h1>
            <p className=" text-richblack-300 lg:w-[90%]">
              our mission goes beyond just delivering courses online. We wanted
              to create a vibrant community of learners, where individuals can
              connect, collaborate, and learn from one another. We believe that
              knowledge thrives in an environment of sharing and dialogue, and
              we foster this spirit of collaboration through forums, live
              sessions, and networking opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* section 4 */}
      <div className=" bg-richblack-700 p-20 grid lg:grid-cols-4 md:grid-cols-2 w-11/ mx-auto gap-y-20 grid-cols-1 my-10 ">
        {states.map((state) => {
          return (
            <div className=" flex flex-col gap-4 justify-between items-center">
              <div className=" text-4xl font-bold text-richblack-5">
                {state.value}
              </div>
              <div className=" text-richblack-300">{state.data}</div>
            </div>
          );
        })}
      </div>
      {/* section 5 */}
      <section className="  ">
        <LearningGrid />
      </section>
      <section className="">
        <ConatactFormSection/>
      </section>

      {/* Review slider */}

      <Footer/>
    </div>
  );
};
export default About;

// import React from "react"
// import Navbar from "../components/common/Navbar"
// import FoundingStory from "../assets/Images/FoundingStory.png"
// import BannerImage1 from "../assets/Images/aboutus1.webp"
// import BannerImage2 from "../assets/Images/aboutus2.webp"
// import BannerImage3 from "../assets/Images/aboutus3.webp"
// import Footer from "../components/common/Footer";
// import HighlightText from "../components/core/Home/Highlight";

// const About = () => {
//   return (

//     <div>
//        <Navbar/>
//       <section className="bg-richblack-700">
//         <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
//           <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
//             Driving Innovation in Online Education for a
//             <HighlightText text={"Brighter Future"} />
//             <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
//               Studynotion is at the forefront of driving innovation in online
//               education. We're passionate about creating a brighter future by
//               offering cutting-edge courses, leveraging emerging technologies,
//               and nurturing a vibrant learning community.
//             </p>
//           </header>
//           <div className="sm:h-[70px] lg:h-[150px]"></div>
//           <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
//             <img src={BannerImage1} alt="" />
//             <img src={BannerImage2} alt="" />
//             <img src={BannerImage3} alt="" />
//           </div>
//         </div>
//       </section>

//       <section className="border-b border-richblack-700">
//         <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
//           <div className="h-[100px] "></div>
//           </div>
//       </section>

//       <section>
//         <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
//           <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
//             <div className="my-24 flex lg:w-[50%] flex-col gap-10">
//               <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
//                 Our Founding Story
//               </h1>
//               <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
//                 Our e-learning platform was born out of a shared vision and
//                 passion for transforming education. It all began with a group of
//                 educators, technologists, and lifelong learners who recognized
//                 the need for accessible, flexible, and high-quality learning
//                 opportunities in a rapidly evolving digital world.
//               </p>
//               <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
//                 As experienced educators ourselves, we witnessed firsthand the
//                 limitations and challenges of traditional education systems. We
//                 believed that education should not be confined to the walls of a
//                 classroom or restricted by geographical boundaries. We
//                 envisioned a platform that could bridge these gaps and empower
//                 individuals from all walks of life to unlock their full
//                 potential.
//               </p>
//             </div>

//             <div>
//               <img
//                 src={FoundingStory}
//                 alt=""
//                 className="shadow-[0_0_20px_0] shadow-[#FC6767]"
//               />
//             </div>
//           </div>
//           <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
//             <div className="my-24 flex lg:w-[40%] flex-col gap-10">
//               <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
//                 Our Vision
//               </h1>
//               <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
//                 With this vision in mind, we set out on a journey to create an
//                 e-learning platform that would revolutionize the way people
//                 learn. Our team of dedicated experts worked tirelessly to
//                 develop a robust and intuitive platform that combines
//                 cutting-edge technology with engaging content, fostering a
//                 dynamic and interactive learning experience.
//               </p>
//             </div>
//             <div className="my-24 flex lg:w-[40%] flex-col gap-10">
//               <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
//               Our Mission
//               </h1>
//               <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
//               Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">

//       </section>

//       <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
//         {/* Reviws from Other Learner */}
//         <h1 className="text-center text-4xl font-semibold mt-8">
//           Reviews from other learners
//         </h1>

//       </div>
//       <Footer />
//     </div>
//   )
// }

// export default About
