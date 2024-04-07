import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface ResponseState {
  _id?: string;
  profile?: string;
  email?: string;
  password?: string;
  username?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
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
    };

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ResponseState>) => {
      localStorage.setItem("userData", JSON.stringify(action.payload));
      return { ...state, ...action.payload };
    },
    // getUser: (state) => {
    //   //   const userData = localStorage.getItem("userData");
    //   //   if (userData) {
    //   //     return JSON.parse(userData);
    //   //   }
    //   return state;
    // },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.users;

export default userSlice.reducer;
