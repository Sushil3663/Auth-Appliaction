import axios from "axios";
import {
  AuthApiLoginResponse,
  AuthApiResponse,
  formikValueType,
  mailData,
  mailResponse,
  OTPResponse,
  resetPassword,
  updateResponse,
  verifyOTP,
} from "../components/Common";
import toast from "react-hot-toast";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const RegisterAPI = async (values: formikValueType) => {
  try {
    const { data: response }: { data: AuthApiResponse } = await instance.post(
      "/register",
      values
    );
    console.log(response);

    if (response?.message) {
      toast.success(response?.message);
      return response?.data;
    }
  } catch (error: any) {
    // console.log(error);
    // if (error.response?.status === 500) {
    //   toast.error(error.response.data.message || "Internal server errors");
    // } else {
    // Handle other statuses or general network errors
    // toast.error(error.message || "An error occurred");
    toast.error(error?.response?.data?.message || error?.response?.data?.error);

    // }
  }
};

export const GetUser = async (email: string, token: string) => {
  try {
    const { data: response }: { data: AuthApiResponse } = await instance.get(
      `/user/${email}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log(response);
    if (response?.success) {
      toast.success(response?.message);
      return response?.data;
    }
  } catch (error: any) {
    console.error(error);
    toast.error(
      error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.message
    );
  }
};

export const LoginAPI = async (values: formikValueType) => {
  console.log(values);
  try {
    const { data: response }: { data: AuthApiLoginResponse } =
      await instance.post("/login", values);
    console.log(response);
    if (response?.success) {
      toast.success(response?.message);
      return response?.data;
    }
  } catch (error: any) {
    console.log(error);
    // if (error.response.status === 500) {
    //   toast.error(error.response.data.message || "Internal server errors");
    // }
    toast.error(error?.response?.data?.message || error?.response?.data?.error);
  }
};

export const GetOTP = async () => {
  try {
    const { data: response }: { data: OTPResponse } = await instance.get(
      "/generateOTP",
      {
        // headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(response);
    if (response?.success) {
      toast.success(response?.message);
      return response?.data;
    }
  } catch (error: any) {
    console.error(error);
    toast.error(
      error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.message
    );
  }
};

export const VerifyOTP = async (data: verifyOTP) => {
  try {
    console.log(data);
    const { data: response }: { data: OTPResponse } = await instance.get(
      `/verifyOTP?data=${data.data}`
    );
    console.log(response);
    if (response?.success) {
      toast.success(response?.message);
      return response?.success;
    } else {
      toast.success(response?.message);
    }
  } catch (error: any) {
    console.error(error);
    toast.error(
      error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.message
    );
  }
};

export const UpdateUser = async (id: string, token: string, data: any) => {
  try {
    const response: updateResponse = await instance.put(
      `/updateuser?id=${id}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response?.success) {
      toast.success(response?.message);
      return response.data;
    }
  } catch (error: any) {
    console.error(error);
    toast.error(error?.response?.data?.message || error?.response?.data?.error);
  }
};

export const resetPassowrd = async (data: resetPassword) => {
  try {
    console.log(data);
    const { data: response }: { data: updateResponse } = await instance.put(
      "/resetPassword",
      data
    );
    if (response?.success) {
      toast.success(response?.message);
      return response?.data;
    } else {
      toast.error(response?.message);
    }
  } catch (error: any) {
    console.error(error);
    toast.error(
      error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.message
    );
  }
};

export const postEmail = async (data: mailData) => {
  console.log(data);
  let { email, username, text, subject } = data;
  try {
    const { data: response }: { data: mailResponse } = await instance.post(
      "/sendMail",
      { email, username, text, subject }
    );
    if (response?.success) {
      toast.success(response?.message);
    }
  } catch (error: any) {
    console.error(error);
    toast.error(
      error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.message
    );
  }
};
