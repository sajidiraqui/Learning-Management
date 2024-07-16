import React, { useEffect } from "react";
import Footer from "../components/common/Footer";
import CourseSlider from "../components/core/CatalogPage/CourseSlider";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { fetchCourseCategories } from "../services/operations/CourseApi";
import { categories } from "../services/apis";
import { apiConnector } from "../services/apiconnector";
import { categoryPageData } from "../services/operations/pageAndComponentData";
import CourseCard from "../components/core/CatalogPage/CourseCard";
const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [active, setActive] = useState(1);

  useEffect(() => {
    const getCatgegories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("response", res?.data?.data);
      const category_Id = res?.data?.data.filter(
        (category) =>
          category.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]._id;
      setCategoryId(category_Id);
    };
    getCatgegories();
  }, [catalogName]);

  useEffect(() => {
    if (categoryId) {
      const getCatgegoriesPageData = async () => {
        try {
          const res = await categoryPageData(categoryId);
          console.log("response1", res);
          setCatalogPageData({...res});
          console.log("catalogPageData", catalogPageData);
          console.log("diffrentcatgeory",catalogPageData?.differentCategory?.course);
        } catch (error) {
          console.log(error);
        }
      };
      getCatgegoriesPageData();
      console.log("a",catalogPageData?.differentCategory.course);
    }
  }, [categoryId]);
  return (
    <div>
      {/* Section 1 */}
      <div className=" bg-richblack-800 box-content px-4  ">
        <div className="max-w-maxContentTab min-h-[260px] mx-auto flex flex-col gap-4 justify-center lg:max-w-maxContent ">
          <p className=" text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className=" text-yellow-25">
              {catalogPageData?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.selectedCategory?.name}
          </p>
          <p className=" max-w-[870px] text-richblack-200 ">
            {catalogPageData?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/*section 1 */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Courses to get you started</div>
        <div className=" my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Populer
          </p>
          <p
            className={`px-4 py-2 ${
              active == 2
                ? "border-b border-b-yellow-25 text-yellow-25  "
                : " text-richblack-50 "
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <CourseSlider courses={catalogPageData?.selectedCategory?.course} />
      </div>

      {/* section 2 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent ">
        <p className="section_heading">
          Top Courses in {catalogPageData?.differentCategory?.name}
        </p>
        <div className="py-8">
          <CourseSlider courses={catalogPageData?.differentCategory?.course} />
        </div>
      </div>

      {/* Section 3 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent ">
        <p className="section_heading ">Frequently Bought together</p>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-10">
          {catalogPageData?.mostSellingCourses.slice(0, 4).map((course,i) => (
            <CourseCard course={course} key={i} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Catalog;
