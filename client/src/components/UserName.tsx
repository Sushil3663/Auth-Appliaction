import React from "react";
import "./style.css";
import profile from "../assets/profiles.png";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { formikValueType } from "./Common";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setEmail } from "../redux/emailSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface MyFormValues {
  email: string;
}
const UserName = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state: RootState) => state.users);

  const handleFormSubmit = (
    values: formikValueType,
    { resetForm }: FormikHelpers<MyFormValues>
  ) => {
    console.log(values);
    dispatch(setEmail(values));
    navigate("/password");
    resetForm();
  };
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const handleNavigate = () => {
    navigate("/register");
  };
  return (
    <div className="bg-img container h-[100vh] w-[100vw]">
      <div className="contant mx-auto">
        <div className=" bg-slate-100 mt-[10rem] w-1/3 drop-shadow-2xl rounded-md">
          <h3 className="text-center text-3xl font-bold mt-4">
            Hello {userData?.username}
          </h3>
          <p className=" text-gray-500 mx-auto text-center mt-2 w-1/2">
            Explore more by connecting with US
          </p>
          <div className="flex justify-center items-center">
            <img
              src={userData.profile || profile}
              alt="image"
              className={
                "bg-center-center bg-no-repeat bg-contain  w-20 h-20 mt-2 mx-auto rounded-full border-r-10 cursor-pointer"
              }
            />
          </div>
          <div className="flex justify-center">
            <Formik
              initialValues={{ email: "" }}
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
                  <div className="flex flex-col mt-4">
                    <Field
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Email"
                      className="p-2 rounded-md sm:p-1"
                      autocomplete="off"
                    />

                    {errors.email && touched.email && errors.email}

                    <button
                      type="submit"
                      className="my-3 py-2 bg-red-500 text-white rounded-md"
                    >
                      Let's Go
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <p className="mb-8 text-center">
            Not a member{" "}
            <span
              className="text-red-500 cursor-pointer"
              onClick={handleNavigate}
            >
              {" "}
              Register Now{" "}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserName;
