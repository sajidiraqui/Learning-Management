import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { BsCart } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import Profile from "../Profile";

//const subLinks=[]
// const subLinks = [
//   {
//     title: "Python",
//     link: "/catalog/python",
//   },
//   {
//     title: "javascript",
//     link: "/catalog/javascript",
//   },
//   {
//     title: "web-development",
//     link: "/catalog/web-development",
//   },
//   {
//     title: "Android Development",
//     link: "/catalog/Android Development",
//   },
// ];
const Navbar = () => {
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  //console.log(token);
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubLinks = async () => {
    try {
      setLoading(true);
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("printing sublinks result : ", result);
      setSubLinks(result.data.data);
      console.log(subLinks);
      setLoading(false);
    } catch (error) {
      console.log("could not fetch category links");
    }
  };
  useEffect(() => {
    fetchSubLinks();
  }, []);
  // useEffect(() => {
  //     (async () => {
  //       setLoading(true)
  //       try {
  //         const res = await apiConnector("GET", categories.CATEGORIES_API)
  //         setSubLinks(res.data.data)
  //         console.log(subLinks);
  //       } catch (error) {
  //         console.log("Could not fetch Categories.", error)
  //       }
  //       setLoading(false)
  //     })()
  //   },[])
  const pathMatch = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  //console.log(subLinks[0]._id);
  return (
    <div className=" h-14 border-b border-b-richblack-700  ">
      <div className=" h-full w-11/12 lg:w-10/12 mx-auto flex items-center justify-between ">
        <div className=" flex items-center ">
          <img
            src={logo}
            alt="logo"
            width={"160"}
            height={"32"}
            className="h-fit object-cover my-auto"
          />
        </div>
        <nav className=" flex flex-col items-center ">
          <ul className=" flex text-richblack-5 items-center gap-10  ">
            {NavbarLinks.map((element, index) => (
              <li key={index} className=" ">
                {element.title === "Catalog" ? (
                  <div className=" flex gap-x-1 items-center relative group ">
                    <p>Catalog</p>
                    <RiArrowDropDownLine className=" text-[24px] " />
                    <div className="   lg:w-[20px] rotate-45 absolute top-[100%] left-[75%] bg-richblack-5 h-[20px] invisible group-hover:visible transition-all duration-200 "></div>
                    <div className=" flex flex-col  invisible absolute lg:w-[200px] bg-richblack-5 top-[110%] -left-[110%] h-[200px] z-10 group-hover:visible transition-all duration-200 text-black p-4 rounded-md ">
                      {subLinks.length ? (
                        subLinks.map((subLink, index) => (
                          <Link
                            to={`/catalog/${subLink.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50 w-full"
                            key={index}
                          >
                            <p key={index} className="text-black ">
                              {subLink.name}
                            </p>
                          </Link>
                        ))
                      ) : (
                        <p className=" text-black ">No data found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={element?.path}>
                    <p
                      className={`${
                        pathMatch(element?.path)
                          ? " text-yellow-25 "
                          : " text-richblack-5"
                      }`}
                    >
                      {element.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* login signup  */}
        <div className=" flex gap-x-4">
          {user && user.accountType !== "instructor" && (
            <div className=" text-richblack-5 ">
              <Link to={"/dashboard/cart"} className="relative">
                <BsCart size={25} />
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              </Link>
            </div>
          )}
          {token == null && (
            <Link to={"/login"}>
              <button
                className=" px-3 py-2 bg-richblack-800 text-richblack-100 
                            border border-richblack-700 rounded-md "
              >
                Log In
              </button>
            </Link>
          )}
          {token == null && (
            <Link to={"/signup"}>
              <button
                className=" px-3 py-2 bg-richblack-800 text-richblack-100 
                            border border-richblack-600  rounded-md "
              >
                Sign Up
              </button>
            </Link>
          )}
          {token != null && <Profile />}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
