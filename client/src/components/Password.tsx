import React from "react";
import "./style.css";
import profile from "../assets/profiles.png";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { formikValueType } from "./Common";
import { GetOTP, LoginAPI, postEmail } from "../api/Api";
import { setAuthToken } from "../redux/authSlice";

const Password = () => {
  const navigate = useNavigate();
  const email = useAppSelector((state: RootState) => state.email.email);
  const userData = useAppSelector((state: RootState) => state.users);
  const dispatch = useAppDispatch();

  const handleFormSubmit = async (values: formikValueType) => {
    let data = { email, ...values };
    console.log(data);
    try {
      const response = await LoginAPI(data);
      console.log(response);
      if (response) {
        dispatch(setAuthToken(response));
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const SignupSchema = Yup.object().shape({
    password: Yup.string().required("Required"),
  });

  const handleNavigate = async () => {
    navigate("/recovery");
    let response = await GetOTP();
    console.log(response);
    if (response) {
      const data = {
        subject: "OTP Authentication",
        text: ` Your OTP Authentication code is ${response}. Please use your OTP Authentication code for reset password.`,
        email: userData.email as string,
        username: userData.username as string,
      };
      await postEmail(data);
    }
  };

  return (
    <div className="outer">
      <div className="inner">
        <div className="mt-8 flex justify-center align-center flex-col">
          <h3 className="text-center text-3xl font-bold mt-4">
            Hello {userData?.username}
          </h3>
          <p className="text-center mt-2 w-2/3 mx-auto text-gray-400">
            Explore more by connecting with US
          </p>
          <div className="flex justify-center items-center">
            <img
              src={userData.profile}
              alt="image"
              className={
                "bg-center-center bg-no-repeat bg-contain  w-20 h-20 mt-2 mx-auto rounded-full border-r-10 cursor-pointer"
              }
            />
          </div>

          <Formik
            initialValues={{ password: "" }}
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
                <div className="flex flex-col mx-auto mt-8 w-1/2">
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
        <p className="mt-4 text-center">
          Forget Passoword?{" "}
          <span
            className="text-red-500 cursor-pointer"
            onClick={handleNavigate}
          >
            Recover Now
          </span>
        </p>
      </div>
    </div>
  );
};

export default Password;
