import LoginForm from "./LoginForm"
import Signup from "./Signup"
import SignupForm from "./SignupForm"
import {signupImage} from "../../assets/Images/signup.webp";
import {loginImage} from "../../assets/Images/login.webp";

const Templates= ({heading,desc1,desc2,formType}) =>{
    return(
        <div>
            {/* w-11/12 */}
            <div>
                 {/* section 1 */}
                <div>
                   <div>{heading}</div>
                   <div>{desc1}</div>
                   <div>{desc2}</div>

                   <div>
                    {
                        formType==='signup' ? (<SignupForm/>) : (<LoginForm/>)
                    }
                   </div>
                   <div>
                      <div></div>
                      <div>OR</div>
                      <div></div>
                   </div>
                   <div>SignUp with Google</div>
                </div>

                {/* section 2*/}
                <div>
                   {
                    formType ==="signup " ? (<img src={signupImage}/>) : (<img src={loginImage}/>)
                   }
                </div>
            </div>
        </div>
    )
}
export default Templates; 