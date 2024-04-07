import "./style.css";
import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { resetPassowrd } from "../api/Api";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "./Common";
interface FormData {
  password: string;
  cpassword: string;
}
const Reset = () => {
  const navigate = useNavigate();

  const userData = useAppSelector((state: RootState) => state.users);
  console.log(userData.email);

  const handleFormSubmit = async (values: FormData) => {
    console.log(values);
    if (values.password !== values.cpassword) {
      toast.error("Password & Conform Password does not match");
    } else {
      // let data = Object.assign(userData, values.password);
      let data = { email: userData.email, password: values.password };
      console.log(data);
      let response = await resetPassowrd(data);
      if (response) {
        navigate("/");
      }
    }
  };
  const SignupSchema = Yup.object().shape({
    password: Yup.string().required("Required"),
    cpassword: Yup.string().required("Required"),
  });

  return (
    <div className="outer">
      <div className="inner">
        <div className="mt-8 flex justify-center align-center flex-col">
          <h3 className="text-center text-3xl font-bold mt-7">
            Reset Password
          </h3>
          <p className="text-center mt-5 w-2/3 mx-auto text-gray-400">
            Enter New Password
          </p>

          <Formik
            initialValues={{ password: "", cpassword: "" }}
            onSubmit={handleFormSubmit}
            validationSchema={SignupSchema}
          >
            {({
              values,

              errors,

              touched,

              handleChange,

              handleBlur,

              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="flex flex-col mx-auto mt-5 w-1/2">
                  <div>
                    <Field
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Password"
                      className="p-2 rounded-md"
                      autocomplete="off"
                    />

                    {errors.password && touched.password && errors.password}
                  </div>
                  <div className="mt-3">
                    <Field
                      type="password"
                      name="cpassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cpassword}
                      placeholder="Confirm Password"
                      className="p-2 rounded-md"
                      autocomplete="off"
                    />

                    {errors.cpassword && touched.cpassword && errors.cpassword}
                  </div>
                  <button
                    type="submit"
                    className="my-3 py-2 bg-red-500 text-white rounded-md"
                  >
                    Sign In
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Reset;
