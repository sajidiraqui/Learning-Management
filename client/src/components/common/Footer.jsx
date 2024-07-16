import React from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {AiFillYoutube,AiFillGoogleCircle,AiOutlineTwitter} from "react-icons/ai";
import {BiLogoFacebookCircle} from "react-icons/bi";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

const Footer = () =>{
    return(
        <div className=" bg-richblack-700 ">
        <div className="w-11/12 mx-auto  flex lg:flex-row flex-col  lg:px-10 lg:py-20 py-10 gap-y-10  ">
             {/* section1 */}
          <div className=" lg:w-[50%] flex lg:flex-row gap-x-14 lg:border-r border-r-richblack-300 flex-wrap ">
             {/* part1 */}
            <div className=" flex flex-col gap-y-4 ">
                <div className="w-[120px]"> <img src={logo}/> </div>
                <div className=" flex font-bold text-richblack-5 ">Company</div>
                <div className=" text-richblack-300 flex flex-col gap-1">
                  <p>About</p>
                  <p>Careers</p>
                  <p>Affiliates</p>
                </div>
                <div className=" flex gap-2 text-richblack-300  ">
                   <div className=" w-[20px]"><BiLogoFacebookCircle className="" /> </div>
                   <div><AiFillGoogleCircle/></div>
                   <div><AiOutlineTwitter/></div>
                   <div><AiFillYoutube/> </div>
                </div>
            </div>
            {/* part2 */}
            <div className=" flex flex-col gap-6">
               <div className=" flex flex-col gap-2" >
                  <div className=" font-bold text-richblack-5 ">Resources</div>
                  <div className=" flex flex-col gap-1 text-richblack-300">
                    <p>Articals</p>
                    <p>Blog</p>
                    <p>Chart Sheet</p>
                    <p>Code Challenges</p>
                    <p>Docs</p>
                    <p>Projects</p>
                    <p>Videos</p>
                    <p>workspaces</p>
                  </div>
               </div>
               <div className=" flex flex-col gap-2 ">
                 <div className=" font-bold text-richblack-5 ">Support</div>
                 <div className=" text-richblack-300 ">Help Center</div>
               </div>
            </div>
            {/* part3 */}
            <div className=" flex flex-col gap-6 ">
              <div className=" flex flex-col gap-2">
                <div className=" font-bold text-richblack-5 ">Plans</div>
                <div className=" flex flex-col gap-1 text-richblack-300">
                  <p>Paid memberships</p>
                  <p>For students</p>
                  <p>Business Students</p>
                </div>
              </div>
              <div className=" flex flex-col ">
                <div className=" text-richblack-5 font-bold ">Community</div>
                <div className=" flex flex-col gap-1 text-richblack-300">
                  <p>Forums</p>
                  <p>Chapters</p>
                  <p>Events</p>
                </div>
              </div>
            </div>
          </div>
          {/* Section2 */}
          <div className=" lg:w-[50%] flex flex-wrap gap-14 lg:px-14 ">
             {
              FooterLink2.map( (element,index)=>(
                <div className=" flex flex-col gap-2 " key={index}>
                    <div className=" text-richblack-5 font-bold ">{element.title} </div>
                    <div className=" flex flex-col text-richblack-300 gap-1 ">
                      {
                        element.links.map((link,ind)=>(
                          <Link to={link.link} key={ind}>
                          {
                            <div className="">
                              {link.title}
                            </div>
                          }
                          </Link>
                        ))
                      }
                    </div>
                </div>
              ))
             }
          </div>
        </div>
        </div>
    )
}
export default Footer;