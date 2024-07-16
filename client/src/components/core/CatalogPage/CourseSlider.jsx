import { Swiper, SwiperSlide } from "swiper/react";
import CourseCard from "./CourseCard";
import {FreeMode, Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const CourseSlider = ({ courses }) => {
  //console.log("courses", courses);
  return (
    <>
      {courses?.length ? (
        <Swiper
          // cssMode={true}
          spaceBetween={50}
          slidesPerView={3}
          // navigation={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          // mousewheel={true}
          // keyboard={true}
          // autoplay={true}
          loop={true}
          modules={[FreeMode,Navigation, Pagination, Mousewheel, Keyboard]}
        >
          {courses.map((course, i) => (
            <SwiperSlide key={i}>
              <CourseCard course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}

      {/* <Swiper
        cssMode={true}
        spaceBetween={50}
        slidesPerView={3}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className=" text-richblack-5 "
      >
      </Swiper> */}
    </>
  );
};
export default CourseSlider;
