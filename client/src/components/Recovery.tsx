import React, { useEffect } from "react";
import "./style.css";
import profile from "../assets/profiles.png";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { GetOTP, postEmail, VerifyOTP } from "../api/Api";
import { verifyOTP } from "./Common";

const Recovery = () => {
  const navigate = useNavigate();
  const userData = useAppSelector((state: RootState) => state.users);

  const handleFormSubmit = async (values: verifyOTP) => {
    console.log("ok");
    console.log(values);
    let response = await VerifyOTP(values);
    if (response) {
      navigate("/reset");
    }
  };
  const SignupSchema = Yup.object().shape({
    data: Yup.string().required("Required"),
  });

  const handleResend = async () => {
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
          <h3 className="text-center text-3xl font-bold mt-4">Recovery</h3>
          <p className="text-center mt-2 w-2/3 mx-auto text-gray-400">
            Enter OTP to recover Password.
          </p>
          <p className="text-center mt-14 mx-auto text-gray-600">
            Enter OTP sent to your Email Address
          </p>

          <Formik
            initialValues={{ data: "" }}
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
                <div className="flex flex-col mx-10 mt-2 ">
                  <Field
                    type="password"
                    name="data"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.data}
                    placeholder="Enter OTP"
                    className="p-2 rounded-md"
                    autocomplete="off"
                  />

                  {errors.data && touched.data && errors.data}

                  <button
                    type="submit"
                    className="my-3 py-2 bg-purple-600 text-white rounded-md"
                  >
                    Recover
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <p className="mt-4 text-center">
          Can't get OTP?{" "}
          <span className="text-red-500 cursor-pointer" onClick={handleResend}>
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};

export default Recovery;
