import { useSignup } from "../hooks/useSignup";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import { Form, useActionData } from "react-router-dom";
import { useEffect } from "react";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let name = formData.get("Name");
  let photo = formData.get("Photo");
  let email = formData.get("Email");
  let password = formData.get("Password");

  return { name, photo, email, password };
};

function Signup() {
  let userSignup = useActionData();

  const { signUpWithGoogle, signupWithPasswordAndEmail, user, error } =
    useSignup();

  useEffect(() => {
    if (userSignup) {
      signupWithPasswordAndEmail(userSignup.name, userSignup.photo, userSignup.email, userSignup.password);
    }
  }, [userSignup]);

  return (
    <div className=" grid place-items-center  mt-20 ">
      <div className="max-w-96 border-2 rounded-md  w-full">
        <Form method="post" className="p-4">
          <FormInput type="text" label="Name" name="Name" />
          <FormInput type="url" label="Photo Url" name="Photo" />
          <FormInput type="email" label="Email" name="Email" />
          <FormInput type="password" label="Password" name="Password" />
          <div>
            <button className="btn btn-primary mt-5 w-full border-slate-500">
              Submit
            </button>
            <button
              onClick={signUpWithGoogle}
              className="btn mt-5 to-base-300 border-slate-500 w-full text-1xl"
            >
              {" "}
              <FcGoogle className="w-6 h-6" /> Google
            </button>
            <p className="text-center mt-5">
              Are you already registered ? {""}
              <Link className="link text-cyan-400" to="/signin">
                Signin
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
