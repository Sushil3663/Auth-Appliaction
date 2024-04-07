import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type ResponseState = {
  email?: string;
};

// let userEmail = localStorage.getItem("userEmail");
const initialState: ResponseState = {
  // email: userEmail ? JSON.parse(userEmail) : "",
  email: "",
};

export const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<ResponseState>) => {
      // localStorage.setItem("userEmail", JSON.stringify(action.payload));
      state.email = action?.payload?.email;
    },
  },
});

export const { setEmail } = emailSlice.actions;

export const selectUser = (state: RootState) => state.email;

export default emailSlice.reducer;
