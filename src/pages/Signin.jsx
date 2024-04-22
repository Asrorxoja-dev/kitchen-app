import { useSignup } from "../hooks/useSignup"
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import { Form, useLoaderData, useActionData} from "react-router-dom";
import { useEffect } from "react";
import useLogin from "../hooks/useLogin";




export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("Email");
  let password = formData.get("Password");


  return { email, password};
}





function Signin() {
const {signUpWithGoogle, user, error} = useSignup()

let userSignin = useActionData();
const {signInWithEmailAndPassword} = useLogin()


useEffect(() => {
  if (userSignin) {
    signInWithEmailAndPassword(userSignin.email, userSignin.password);
  }
}, [userSignin]);

  return (
    <div className=" grid place-items-center mt-20">
   <div className="max-w-96 border-2 rounded-md  w-full">
   <Form method="post" className="p-4">
    <FormInput type="email" label="Email" name="Email"/>
    <FormInput type="password" label="Password" name="Password"/>
     <div>
       <button className="btn btn-primary mt-5 w-full border-slate-500">Submit</button>
     <button onClick={signUpWithGoogle} className="btn to-base-300 mt-5 w-full border-slate-500"> <FcGoogle className="w-6 h-6" />  Google</button>
      <p className="text-center mt-5"> If you don't have accaunt, {""}
      <Link className="link text-cyan-400" to="/signup">Signup</Link>
      </p>
     </div>
   </Form>
   </div>
    </div>
  )
}

export default Signin