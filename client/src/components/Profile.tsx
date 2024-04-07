import React, { ChangeEvent, useEffect, useState } from "react";
import "./style.css";
import profile from "../assets/profiles.png";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ImageToBase64 } from "./ImageToBase64";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { GetUser, UpdateUser } from "../api/Api";
import { setAuthToken } from "../redux/authSlice";
import { AuthApiLoginResponse, StateData } from "./Common";

const Profile = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<string>("");
  // console.log(file);
  const [details, setDetails] = useState<StateData>();
  const userData = useAppSelector((state: RootState) => state.users);
  const userToken = useAppSelector((state: RootState) => state.auth);
  console.log(userToken.token as string);
  console.log(details);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetail = await GetUser(
          userToken.email as string,
          userToken.token as string
        );
        console.log(userDetail);
        if (userDetail) {
          console.log(userDetail);
          setDetails(userDetail);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleFormSubmit = async (values: any) => {
    console.log("ok");
    values = await Object.assign(values, {
      profile: file ? file : details?.profile,
    });
    console.log(values);

    try {
      let response = await UpdateUser(userToken._id, userToken.token, values);
      if (response) {
        const userDetail = await GetUser(
          userToken.email as string,
          userToken.token as string
        );
        if (userDetail) {
          setDetails(userDetail);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const SignupSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    profile: Yup.string().required("Required"),
  });

  const handleNavigate = () => {
    navigate("/");
    dispatch(setAuthToken(null));
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
          <h3 className="text-center text-3xl font-bold">Profile</h3>
          <p className="text-center mt-2 w-2/3 mx-auto text-gray-400">
            You can Update the details
          </p>

          <Formik
            initialValues={{
              firstName: details?.firstName || "",
              lastName: details?.lastName || "",
              email: details?.email || "",
              phone: details?.phone || "",
              address: details?.address || "",
              profile: details?.profile || "",
            }}
            enableReinitialize={true}
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
                <div className="flex flex-col gap-3 mx-auto mt-1">
                  <div className="flex justify-center items-center">
                    <label htmlFor="profile">
                      <img
                        src={file || details?.profile || profile}
                        alt="image"
                        className={
                          "bg-center-center bg-slate-600 bg-no-repeat bg-contain  w-20 h-20 mt-2 mx-auto rounded-full border-r-10 cursor-pointer"
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
                  <div className="flex flex-row justify-center mx-5 items-center mt-3 gap-2">
                    <Field
                      type="text"
                      name="firstName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      placeholder="Enter First Name"
                      className="p-2 w-44 rounded-md"
                      autocomplete="off"
                    />

                    {errors.firstName && touched.firstName && (
                      <div className="text-red-500">{errors.firstName}</div>
                    )}
                    <Field
                      type="text"
                      name="lastName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      placeholder="Enter Last Name"
                      className="p-2 w-44 rounded-md"
                      autocomplete="off"
                    />
                  </div>

                  {errors.lastName && touched.lastName && errors.lastName}

                  <div className="flex flex-row justify-center items-center mx-5 gap-2">
                    <Field
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Enter Email"
                      className="p-2 w-44 rounded-md"
                      autocomplete="off"
                    />

                    {errors.email && touched.email && errors.email}
                    <Field
                      type="phone"
                      name="phone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                      placeholder="Enter Phone Number"
                      className="p-2 w-44 rounded-md"
                      autocomplete="off"
                    />
                  </div>
                  {errors.phone && touched.phone && errors.phone}
                  <Field
                    type="text"
                    name="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    placeholder="Enter Address"
                    className="p-2 mx-4 rounded-md"
                    autocomplete="off"
                  />
                  {errors.address && touched.address && errors.address}
                  <button
                    type="submit"
                    className="my-2 mx-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Update
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <p className="mt-2 text-center">
          come back latter?{" "}
          <span
            className="text-red-500 cursor-pointer"
            onClick={handleNavigate}
          >
            Logout
          </span>
        </p>
      </div>
    </div>
  );
};

export default Profile;
