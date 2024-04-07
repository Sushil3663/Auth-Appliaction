export interface formikValueType {
  email?: string;
  username?: string;
  password?: string;
  profile?: string;
}

export interface AuthApiResponse {
  data: {
    _id: string;
    profile: string;
    email: string;
    password: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    phone?: string;
    __v: number;
  };
  success: boolean;
  message: string;
}

export interface AuthApiLoginResponse {
  data: {
    _id: string;
    profile: string;
    email: string;
    password: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    token: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    phone?: string;
    __v: number;
  };
  success: boolean;
  message: string;
}

export interface StateData {
  _id: string;
  profile: string;
  email: string;
  password: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  phone?: string;
  __v: number;
}

export interface OTPResponse {
  data: string;
  success: boolean;
  message: string;
}

export interface updateResponse {
  data: {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedId: null;
    upsertedCount: number;
    matchedCount: number;
  };
  success: boolean;
  message: string;
}

export interface mailResponse {
  success: boolean;
  message: string;
}

export interface mailData {
  email: string;
  username: string;
  text: string;
  subject: string;
}

export interface resetPassword {
  email?: string;
  password?: string;
}

export interface verifyOTP {
  data: string;
}
