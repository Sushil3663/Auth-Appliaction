import React, { ChangeEvent, useState } from "react";
import "./style.css";
import profile from "../assets/profiles.png";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ImageToBase64 } from "./ImageToBase64";
import { RegisterAPI } from "../api/Api";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/userSlice";
import { formikValueType } from "./Common";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<string>("");
  // console.log(file);

  const handleFormSubmit = async (values: formikValueType) => {
    // console.log(values);
    values = await Object.assign(values, { profile: file || "" });
    // values = { ...values, profile: file || "" };
    // console.log(values);
    try {
      const response = await RegisterAPI(values);
      if (response) {
        dispatch(setUser(response));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleNavigate = () => {
    navigate("/");
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // setFile(e.target.files[0]);
      let data = await ImageToBase64(e.target.files[0]);
      setFile(data as string);
    }
  };

  return (
    <div className="outer">
      <div className="inner">
        <div className="mt-8">
          <h3 className="text-center text-3xl font-bold">Register</h3>
          <p className="text-center mt-2 w-2/3 mx-auto text-gray-400">
            Happy to join you here!
          </p>

          <Formik
            initialValues={{
              email: "",
              username: "",
              password: "",
            }}
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
                <div className="flex flex-col gap-2 mx-auto mt-1 w-1/2">
                  <div className="flex justify-center items-center">
                    <label htmlFor="profile">
                      <img
                        src={file || profile}
                        alt="image"
                        className={
                          "bg-center-center bg-no-repeat bg-contain  w-20 h-20 mt-2 mx-auto rounded-full border-r-10 cursor-pointer"
                        }
                      />
                    </label>
                    <input
                      type="file"
                      name="profile"
                      id="profile"
                      onChange={handleFileChange}
                      className=""
                      accept="image/*"
                    />
                  </div>
                  <Field
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Enter Email"
                    className="p-2 rounded-md"
                    autocomplete="off"
                  />

                  {errors.email && touched.email && errors.email}
                  <Field
                    type="text"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    placeholder="Username"
                    className="p-2 rounded-md"
                    autocomplete="off"
                  />

                  {errors.username && touched.username && errors.username}
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
                    className="my-2 py-2 bg-red-500 text-white rounded-md"
                  >
                    Let's Go
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <p className="mt-2 text-center">
          Already Register?{" "}
          <span
            className="text-red-500 cursor-pointer"
            onClick={handleNavigate}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
