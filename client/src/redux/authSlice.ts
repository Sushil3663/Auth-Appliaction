import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface ResponseState {
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
}

// Define the initial state using that type
const initialUserData = localStorage.getItem("userData");
let initialState: ResponseState = initialUserData
  ? JSON.parse(initialUserData)
  : {
      email: "",
      password: "",
      username: "",
      profile: "",
      token: "",
    };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<ResponseState | null>) => {
      if (action.payload) {
        localStorage.setItem("userData", JSON.stringify(action.payload));
        state = {
          ...state,
          email: action.payload.email,
          password: action.payload.password,
          username: action.payload.username,
          profile: action.payload.profile,
          token: action.payload.token,
        };
      } else {
        localStorage.removeItem("userData");
        return {
          ...state,
          email: "",
          password: "",
          username: "",
          profile: "",
          token: "",
        };
      }
    },
  },
});

export const { setAuthToken } = authSlice.actions;

export const selectUser = (state: RootState) => state.users;

export default authSlice.reducer;
